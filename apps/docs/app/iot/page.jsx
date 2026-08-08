export default function IoTDocsPage() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>@agevine/iot SDK</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        The IoT SDK provides a standardized way to ingest telemetry from non-wearable devices, such as bed sensors, fall detection mats, and smart home cameras.
      </p>

      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <code style={{ fontFamily: 'monospace' }}>npm install @agevine/iot</code>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Adapter Pattern</h3>
      <p>
        The SDK uses an adapter pattern to support various hardware communication protocols. You register adapters with the main client, which then normalizes the data and forwards it to your self-hosted Agevine API Gateway.
      </p>

      <ul>
        <li><strong>WebhookAdapter:</strong> For devices that push JSON payloads via HTTP POST.</li>
        <li><strong>MQTTAdapter:</strong> Connects to an MQTT broker (like Mosquitto or Home Assistant) to listen for topic updates.</li>
        <li><strong>BLEAdapter:</strong> Interacts with local Bluetooth Low Energy devices.</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Quick Example</h3>
      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0 }}>
          <code style={{ fontFamily: 'monospace' }}>
{`import { AgevineIoTClient, WebhookAdapter } from '@agevine/iot';

const client = new AgevineIoTClient({
  endpoint: 'http://localhost:3005'
});

const cameraAdapter = new WebhookAdapter();
client.registerAdapter(cameraAdapter);

// Manually trigger an event from your local server:
cameraAdapter.handleIncomingWebhook({
  patientId: 1,
  sensorType: 'motion',
  eventType: 'trigger',
  value: 'detected'
});`}
          </code>
        </pre>
      </div>
    </div>
  )
}
