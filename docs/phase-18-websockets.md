# Phase 18: Real-Time WebSockets

In Phase 18, Agevine's OSS Dashboard (`ui-core`) was upgraded to support real-time data streaming.

## WebSockets
Instead of relying on HTTP polling (e.g., `setInterval`), the dashboard now connects natively to the API Gateway using WebSockets.
- **Endpoint**: `ws://localhost:3005` (configurable via `NEXT_PUBLIC_WS_URL`)
- **Behavior**: When the API Gateway receives a Webhook from a wearable device (iOS HealthKit or Android Health Connect), it broadcasts the data instantly to all connected WebSocket clients.
- **UI Reactivity**: The Recharts graphs (`VitalsChart.tsx`) automatically re-render the moment a new packet arrives, achieving sub-second latency for EKG and heart rate visualization.

## Configuration
Ensure your `.env.local` contains the following:
```env
NEXT_PUBLIC_API_URL=http://localhost:3005
NEXT_PUBLIC_WS_URL=ws://localhost:3005
```
