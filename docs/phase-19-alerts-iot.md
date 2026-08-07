# Phase 19: Alerts Engine & IoT SDK

## Architecture Overview

Phase 19 adds the foundational "plumbing" for the Agevine OSS ecosystem to react to critical health events and ingest data from non-wearable devices.

### Alerts Engine
The Alerts Engine lives in `api-gateway`. It allows users to define custom thresholds for vitals (e.g., `heartRate > 120`) or boolean flags (`fallDetected == 1`).

- **Dispatcher Logic**: The engine operates purely via environment variables for OSS flexibility:
  - If `SENDGRID_API_KEY` is present, it routes to SendGrid.
  - If `TWILIO_ACCOUNT_SID` is present, it routes to Twilio.
  - If neither are present, it logs to the console to prevent failing gracefully.
  - **Webhook Channel**: Native support for POSTing JSON to Discord, Slack, or any webhook receiver for maximum OSS compatibility.

- **Evaluation Engine**: After every `POST /api/v1/wearables/webhook` or `POST /api/v1/iot/webhook`, the gateway evaluates all active rules for the given `patientId` asynchronously, ensuring the HTTP request doesn't block.

### @agevine/iot SDK
Rather than bundling IoT code into the `@agevine/wearables` SDK, we've created a dedicated `@agevine/iot` package.

The IoT package uses an adapter pattern (`IoTSensorAdapter`):
- `WebhookAdapter`: Useful for cameras or custom microcontrollers (ESP32).
- `MQTTAdapter`: Built for standard smart home data ingestion.
- `BLEAdapter`: Built for localized beacons or wristbands.

All adapters funnel events into the `AgevineIoTClient.reportEvent()` method, which pushes data to `/api/v1/iot/webhook`.
