import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from "./db";
import { vitalsLogs, voiceLogs, patients, waitlist, alertRules, alertEvents, iotEvents } from "./db/schema";
import { desc, eq, and } from "drizzle-orm";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'agevine-api-gateway',
    timestamp: new Date().toISOString()
  });
});

// Alerts Engine: Notification Dispatchers
async function sendNotification(rule: any, message: string) {
  try {
    if (rule.channel === 'email') {
      const sgApiKey = process.env.SENDGRID_API_KEY;
      if (sgApiKey) {
        // In a real implementation, you would use @sendgrid/mail
        console.log(`[Alerts Engine] Sending email to ${rule.destination}: ${message}`);
      } else {
        console.log(`[Alerts Engine] (Mock Email) To ${rule.destination}: ${message}`);
      }
    } else if (rule.channel === 'sms') {
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      if (twilioSid) {
        // In a real implementation, you would use twilio client
        console.log(`[Alerts Engine] Sending SMS to ${rule.destination}: ${message}`);
      } else {
        console.log(`[Alerts Engine] (Mock SMS) To ${rule.destination}: ${message}`);
      }
    } else if (rule.channel === 'webhook') {
      await fetch(rule.destination, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alert: message, ruleId: rule.id, patientId: rule.patientId })
      });
      console.log(`[Alerts Engine] Webhook sent to ${rule.destination}`);
    }

    // Log the event
    await db.insert(alertEvents).values({
      ruleId: rule.id,
      patientId: rule.patientId,
      message,
      channel: rule.channel,
      status: 'sent',
      createdAt: new Date()
    });
  } catch (error) {
    console.error(`[Alerts Engine] Failed to send ${rule.channel} notification:`, error);
    await db.insert(alertEvents).values({
      ruleId: rule.id,
      patientId: rule.patientId,
      message,
      channel: rule.channel,
      status: 'failed',
      createdAt: new Date()
    });
  }
}

// Alerts Engine: Evaluator Logic
async function evaluateAlerts(patientId: number, data: any) {
  try {
    // Fetch all enabled rules for this patient
    const rules = await db.select().from(alertRules).where(and(eq(alertRules.patientId, patientId), eq(alertRules.enabled, true)));
    
    for (const rule of rules) {
      if (data[rule.metric] !== undefined && data[rule.metric] !== null) {
        const metricValue = Number(data[rule.metric]);
        const thresholdValue = Number(rule.threshold);
        let isTriggered = false;

        switch (rule.condition) {
          case 'gt':
            isTriggered = metricValue > thresholdValue;
            break;
          case 'lt':
            isTriggered = metricValue < thresholdValue;
            break;
          case 'eq':
            isTriggered = metricValue === thresholdValue;
            break;
        }

        if (isTriggered) {
          const message = `Agevine Alert: Patient ${patientId} ${rule.metric} is ${metricValue} (Threshold: ${rule.condition} ${thresholdValue})`;
          await sendNotification(rule, message);
        }
      }
    }
  } catch (error) {
    console.error(`[Alerts Engine] Error evaluating alerts for patient ${patientId}:`, error);
  }
}

// Wearable Webhook Data Ingestion
app.post('/api/v1/wearables/webhook', async (req: Request, res: Response): Promise<any> => {
  try {
    const { patientId, heartRate, steps, bloodOxygen } = req.body;
    
    if (!patientId) {
      return res.status(400).json({ error: 'patientId is required' });
    }

    await db.insert(vitalsLogs).values({
      patientId: parseInt(patientId),
      heartRate: heartRate || null,
      steps: steps || null,
      bloodOxygen: bloodOxygen || null,
      timestamp: new Date()
    });

    console.log(`Inserted new vitals for patient ${patientId}`);
    
    // Evaluate Alerts asynchronously
    evaluateAlerts(parseInt(patientId), { heartRate, steps, bloodOxygen }).catch(err => console.error(err));

    return res.status(201).json({ message: 'Vitals data logged successfully' });
  } catch (error) {
    console.error('Failed to log vitals data:', error);
    return res.status(500).json({ error: 'Failed to process webhook' });
  }
});

import { AgevineVoiceClient } from "@agevine/voice";
import { WebSocketServer, WebSocket } from "ws";
import * as http from "http";

const voiceClient = new AgevineVoiceClient({
  endpoint: `http://localhost:${port}`,
  openAiApiKey: process.env.OPENAI_API_KEY // Optional for real TTS
});

// Voice Engine Webhook Ingestion
app.post('/api/v1/voice/webhook', async (req: Request, res: Response): Promise<any> => {
  try {
    const { patientId, transcript, summary, durationSeconds, sentimentScore } = req.body;
    
    if (!patientId || !transcript) {
      return res.status(400).json({ error: 'patientId and transcript are required' });
    }

    await db.insert(voiceLogs).values({
      patientId: parseInt(patientId),
      transcript,
      summary: summary || null,
      durationSeconds: durationSeconds || null,
      sentimentScore: sentimentScore || null,
      timestamp: new Date()
    });

    console.log(`Inserted new voice log for patient ${patientId}`);
    return res.status(201).json({ message: 'Voice log saved successfully' });
  } catch (error) {
    console.error('Failed to log voice data:', error);
    return res.status(500).json({ error: 'Failed to process voice webhook' });
  }
});

// IoT Webhook Data Ingestion
app.post('/api/v1/iot/webhook', async (req: Request, res: Response): Promise<any> => {
  try {
    const { patientId, sensorType, eventType, value, metadata } = req.body;
    
    if (!patientId || !sensorType || !eventType) {
      return res.status(400).json({ error: 'patientId, sensorType, and eventType are required' });
    }

    await db.insert(iotEvents).values({
      patientId: parseInt(patientId),
      sensorType,
      eventType,
      value: value || null,
      metadata: metadata ? JSON.stringify(metadata) : null,
      timestamp: new Date()
    });

    console.log(`[IoT] Inserted new event for patient ${patientId} from ${sensorType}`);

    // If it's a fall detection event, evaluate alerts immediately
    if (sensorType === 'fall_mat' || eventType === 'fall') {
      evaluateAlerts(parseInt(patientId), { fallDetected: 1 }).catch(err => console.error(err));
    }

    return res.status(201).json({ message: 'IoT event logged successfully' });
  } catch (error) {
    console.error('Failed to log IoT data:', error);
    return res.status(500).json({ error: 'Failed to process IoT webhook' });
  }
});

// Synthesize Audio Endpoint (Uses @agevine/voice TTS SDK)
app.post('/api/v1/voice/synthesize', async (req: Request, res: Response): Promise<any> => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const audioBuffer = await voiceClient.synthesizeSpeech(text);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length
    });
    
    return res.send(audioBuffer);
  } catch (error) {
    console.error('Failed to synthesize audio:', error);
    return res.status(500).json({ error: 'Failed to synthesize audio' });
  }
});

app.get('/', (req, res) => {
  res.send('Agevine API Gateway is running');
});

// Create HTTP server from the Express app
const server = http.createServer(app);

// Initialize WebSocket server instance
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket, request) => {
  console.log(`[WebSocket] New client connected: ${request.url}`);
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`[WebSocket] Received EKG data for patient ${data.patientId}: HR ${data.heartRate}`);
      // In production, push this to a Redis stream or time-series DB for the UI to consume
    } catch (e) {
      console.error("[WebSocket] Failed to parse message");
    }
  });

  ws.on('close', () => {
    console.log("[WebSocket] Client disconnected");
  });
});

app.get('/api/vitals', async (req, res) => {
  try {
    const pid = req.query.patientId ? parseInt(req.query.patientId as string) : null;
    
    let patient;
    if (pid) {
      const p = await db.select().from(patients).where(eq(patients.id, pid)).limit(1);
      patient = p[0];
    } else {
      const p = await db.select().from(patients).orderBy(desc(patients.createdAt)).limit(1);
      patient = p[0];
    }

    if (!patient) {
      return res.status(404).json({ error: "No patient found" });
    }

    const patientId = patient.id;

    // Fetch most recent vitals log
    const recentVitals = await db.select()
      .from(vitalsLogs)
      .where(eq(vitalsLogs.patientId, patientId))
      .orderBy(desc(vitalsLogs.timestamp))
      .limit(1);

    // Fetch most recent voice log
    const recentVoice = await db.select()
      .from(voiceLogs)
      .where(eq(voiceLogs.patientId, patientId))
      .orderBy(desc(voiceLogs.timestamp))
      .limit(1);

    const vital = recentVitals[0];
    const voice = recentVoice[0];

    res.json({
      patient: patient,
      heartRate: vital?.heartRate || "--",
      heartRateTrend: "Live from API Gateway",
      steps: vital?.steps || 0,
      stepsTrend: "Live from API Gateway",
      checkInMessage: voice?.summary || voice?.transcript || "No recent check-in",
      checkInStatus: voice?.sentimentScore ? `Sentiment: ${voice.sentimentScore}/100 • ${new Date(voice.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : "No sentiment data"
    });
  } catch (error) {
    console.error("Failed to fetch from DB:", error);
    res.status(500).json({ error: "Failed to fetch vitals data" });
  }
});

app.get('/api/vitals/history', async (req, res) => {
  try {
    const pid = req.query.patientId ? parseInt(req.query.patientId as string) : null;
    let patientId = pid;

    if (!patientId) {
       const p = await db.select().from(patients).orderBy(desc(patients.createdAt)).limit(1);
       if (p.length > 0) patientId = p[0].id;
    }

    if (!patientId) return res.json([]);

    // Fetch last 12 vitals logs for patient
    const history = await db.select()
      .from(vitalsLogs)
      .where(eq(vitalsLogs.patientId, patientId))
      .orderBy(desc(vitalsLogs.timestamp))
      .limit(12);

    // Recharts expects chronological order, so reverse the descending list
    const chartData = history.reverse().map(log => ({
      time: new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      heartRate: log.heartRate || 0,
      steps: log.steps || 0
    }));

    res.json(chartData);
  } catch (error) {
    console.error("Failed to fetch history from DB:", error);
    res.status(500).json({ error: "Failed to fetch vitals history" });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const allPatients = await db.select().from(patients).orderBy(desc(patients.createdAt));
    res.json(allPatients);
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

app.get('/api/voice-logs', async (req, res) => {
  try {
    const allLogs = await db.select().from(voiceLogs).orderBy(desc(voiceLogs.timestamp)).limit(50);
    res.json(allLogs);
  } catch (error) {
    console.error("Failed to fetch voice logs:", error);
    res.status(500).json({ error: "Failed to fetch voice logs" });
  }
});

// Alerts Engine CRUD Routes
app.post('/api/alerts/rules', async (req: Request, res: Response): Promise<any> => {
  try {
    const { patientId, metric, condition, threshold, channel, destination } = req.body;
    if (!patientId || !metric || !condition || !threshold || !channel || !destination) {
      return res.status(400).json({ error: 'Missing required alert rule fields' });
    }

    const result = await db.insert(alertRules).values({
      patientId: parseInt(patientId),
      metric,
      condition,
      threshold: threshold.toString(),
      channel,
      destination,
      enabled: true,
      createdAt: new Date()
    }).returning();

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error("Failed to create alert rule:", error);
    res.status(500).json({ error: "Failed to create alert rule" });
  }
});

app.get('/api/alerts/rules', async (req, res) => {
  try {
    const pid = req.query.patientId ? parseInt(req.query.patientId as string) : null;
    let rules;
    if (pid) {
      rules = await db.select().from(alertRules).where(eq(alertRules.patientId, pid)).orderBy(desc(alertRules.createdAt));
    } else {
      rules = await db.select().from(alertRules).orderBy(desc(alertRules.createdAt));
    }
    res.json(rules);
  } catch (error) {
    console.error("Failed to fetch alert rules:", error);
    res.status(500).json({ error: "Failed to fetch alert rules" });
  }
});

app.delete('/api/alerts/rules/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(alertRules).where(eq(alertRules.id, id));
    return res.json({ success: true });
  } catch (error) {
    console.error("Failed to delete alert rule:", error);
    res.status(500).json({ error: "Failed to delete alert rule" });
  }
});

app.get('/api/alerts/history', async (req, res) => {
  try {
    const pid = req.query.patientId ? parseInt(req.query.patientId as string) : null;
    let history;
    if (pid) {
      history = await db.select().from(alertEvents).where(eq(alertEvents.patientId, pid)).orderBy(desc(alertEvents.createdAt)).limit(50);
    } else {
      history = await db.select().from(alertEvents).orderBy(desc(alertEvents.createdAt)).limit(50);
    }
    res.json(history);
  } catch (error) {
    console.error("Failed to fetch alert history:", error);
    res.status(500).json({ error: "Failed to fetch alert history" });
  }
});

// SaaS Waitlist Ingestion
app.post('/api/v1/waitlist', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    await db.insert(waitlist).values({
      email: email.toLowerCase(),
      createdAt: new Date()
    });

    console.log(`[Waitlist] New signup: ${email}`);
    return res.status(201).json({ message: 'Successfully joined waitlist' });
  } catch (error: any) {
    // Check for unique constraint violation (duplicate email)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email is already on the waitlist' });
    }
    console.error('Failed to join waitlist:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

server.listen(port, () => {
  console.log(`[API Gateway] Server is running on port ${port} (HTTP & WebSocket)`);
});
