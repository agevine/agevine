# @agevine/wearables

The official Node.js SDK for streaming smartwatch and IoT health data into the Agevine platform.

## Installation

```bash
npm install @agevine/wearables
```

## Usage

Use this SDK to push Apple Watch, Fitbit, or Garmin health vitals directly into your Agevine dashboard in real-time.

```typescript
import { AgevineWearableClient } from '@agevine/wearables';

const client = new AgevineWearableClient({
  endpoint: 'http://localhost:3001' // Your Agevine API Gateway URL
});

await client.logVitals({
  patientId: 1,
  heartRate: 72,
  steps: 3500,
  bloodOxygen: 98
});
```

## License
MIT
