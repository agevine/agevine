import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from "./db";
import { vitalsLogs, voiceLogs } from "./db/schema";
import { desc } from "drizzle-orm";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

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

// Wearable Webhook Stub (To be implemented)
app.post('/api/v1/wearables/webhook', (req: Request, res: Response) => {
  console.log('Received wearable data ping:', req.body);
  res.status(202).json({ message: 'Data accepted for processing' });
});

// Voice Engine Webhook Stub (To be implemented)
app.post('/api/v1/voice/webhook', (req: Request, res: Response) => {
  console.log('Received voice interaction ping:', req.body);
  res.status(202).json({ message: 'Voice data accepted' });
});

app.get('/', (req, res) => {
  res.send('Agevine API Gateway is running');
});

app.get('/api/vitals', async (req, res) => {
  try {
    // Fetch most recent vitals log
    const recentVitals = await db.select()
      .from(vitalsLogs)
      .orderBy(desc(vitalsLogs.timestamp))
      .limit(1);

    // Fetch most recent voice log
    const recentVoice = await db.select()
      .from(voiceLogs)
      .orderBy(desc(voiceLogs.timestamp))
      .limit(1);

    const vital = recentVitals[0];
    const voice = recentVoice[0];

    res.json({
      heartRate: vital?.heartRate || "--",
      heartRateTrend: "Live from DB",
      steps: vital?.steps || 0,
      stepsTrend: "Live from DB",
      checkInMessage: voice?.transcript || "No recent check-in",
      checkInStatus: voice?.sentimentScore ? `Sentiment: ${voice.sentimentScore}/100` : "No sentiment data"
    });
  } catch (error) {
    console.error("Failed to fetch from DB:", error);
    res.status(500).json({ error: "Failed to fetch vitals data" });
  }
});

app.listen(port, () => {
  console.log(`[API Gateway] Server is running on port ${port}`);
});
