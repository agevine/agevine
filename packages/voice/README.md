# @agevine/voice

The official Node.js SDK for integrating Voice AI providers (Retell AI, Vapi, Bland AI, etc.) into the Agevine platform. 

## Installation

```bash
npm install @agevine/voice
```

## Usage

Use this SDK to push call transcripts, summaries, and sentiment scores into your Agevine dashboard after an AI voice call completes.

```typescript
import { AgevineVoiceClient } from '@agevine/voice';

const client = new AgevineVoiceClient({
  endpoint: 'http://localhost:3001' // Your Agevine API Gateway URL
});

await client.logCall({
  patientId: 1,
  durationSeconds: 180,
  sentimentScore: 85,
  transcript: "AI: Hello, how are you feeling today?\nPatient: I am doing well, thank you.",
  summary: "Patient reported feeling well and took their medication."
});
```

## License
MIT
