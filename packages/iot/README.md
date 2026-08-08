# `@agevine/iot`

The official Open-Source SDK for integrating Smart Home IoT sensors, fall detection mats, and BLE devices into the Agevine ecosystem.

## Installation

```bash
npm install @agevine/iot
```

## Quick Start

```typescript
import { AgevineIoTClient, WebhookAdapter } from '@agevine/iot';

const client = new AgevineIoTClient({
  endpoint: 'http://localhost:3005'
});

// Using a webhook adapter for a Wi-Fi camera
const cameraAdapter = new WebhookAdapter();
client.registerAdapter(cameraAdapter);

// When your express server receives a webhook from the camera:
cameraAdapter.handleIncomingWebhook({
  patientId: 1,
  sensorType: 'motion',
  eventType: 'trigger',
  value: 'detected'
});
```

## Supported Adapters
- **WebhookAdapter**: Universal adapter for devices that send HTTP POSTs (Ring, Nest, custom ESP32).
- **MQTTAdapter**: Connects to an MQTT broker (e.g. Mosquitto, Home Assistant) to ingest state changes.
- **BLEAdapter**: Scans for localized Bluetooth Low Energy devices (fall detection wristbands).
