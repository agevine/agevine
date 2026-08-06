# @agevine/voice

The official Node.js SDK for integrating Voice AI providers (Retell AI, Vapi, Bland AI, etc.) into the Agevine platform. 

## Installation

```bash
npm install @agevine/voice
```

## Usage

Use this SDK to push call transcripts, summaries, and sentiment scores into your Agevine dashboard after an AI voice call completes, and generate photorealistic speech using the built-in TTS adapters.

```typescript
import { AgevineVoiceClient, OpenAIVoiceAdapter } from '@agevine/voice';

const client = new AgevineVoiceClient({
  endpoint: 'http://localhost:3001', // Your Agevine API Gateway URL
  openAiApiKey: process.env.OPENAI_API_KEY // Enables real TTS synthesis
});

// 1. Log a completed voice call
await client.logCall({
  patientId: 1,
  durationSeconds: 180,
  sentimentScore: 85,
  transcript: "AI: Hello, how are you feeling today?\nPatient: I am doing well, thank you.",
  summary: "Patient reported feeling well and took their medication."
});

// 2. Generate Audio Buffer from text
const audioBuffer = await client.synthesizeSpeech("Hello, how are you feeling today?");
// audioBuffer is an MP3 Buffer ready to be streamed to a client
```

## License
MIT
