# @agevine/wearables

The official Node.js SDK for streaming smartwatch and IoT health data into the Agevine platform.

## Installation

```bash
npm install @agevine/wearables
```

## Usage

Use this SDK to push Apple Watch, Fitbit, or Garmin health vitals directly into your Agevine dashboard in real-time.

```typescript
import { AgevineClient, OuraAdapter } from '@agevine/wearables';

const client = new AgevineClient({
  endpoint: 'http://localhost:3001' // Your Agevine API Gateway URL
});

// 1. Sync Vitals via REST
await client.syncVitals({
  patientId: 1,
  heartRate: 72,
  steps: 3500,
  bloodOxygen: 98
});

// 2. Stream Vitals via WebSockets (60Hz)
client.startStream(1, () => {
  client.streamData({ patientId: 1, heartRate: 75 });
});

// 3. Connect 3rd Party Clouds
const oura = new OuraAdapter();
// oura.fetchVitals(token)...
```

###2. **Native iOS / Android Modules**: Access native Apple HealthKit and Google HealthConnect sensor data and stream it via WebSockets directly to your Agevine API Gateway.

## Adapters Currently Supported
- **Oura Ring** (Fully functional via OAuth)
- **Whoop** (Fully functional via OAuth)
- **Garmin** (Stubbed, waiting on Enterprise Partner approval)
- **Apple HealthKit** (Fully functional Native iOS WebSocket streaming)
- **Google HealthConnect** (Fully functional Native Android Kotlin Flow): `import com.agevine.wearables.AgevineHealthConnect`

## License
MIT
