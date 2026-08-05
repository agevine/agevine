import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

app.listen(port, () => {
  console.log(`[API Gateway] Server is running on port ${port}`);
});
