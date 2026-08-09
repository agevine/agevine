export default function WearablesPage() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Wearables SDK</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        The `@agevine/wearables` SDK allows you to easily stream heart rate and step count data from any smartwatch into your Agevine dashboard.
      </p>

      <h3 style={{ marginTop: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>Installation</h3>
      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <code style={{ fontFamily: 'monospace' }}>
          npm install @agevine/wearables
        </code>
      </div>

      <h3 style={{ marginTop: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>Usage</h3>
      <p>Simply initialize the client with your API Gateway endpoint and start pushing data.</p>
      
      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontFamily: 'monospace' }}>
          {`import { AgevineWearableClient } from '@agevine/wearables';

// 1. Connect to your self-hosted API Gateway
const client = new AgevineWearableClient({ 
  endpoint: 'http://localhost:3005' 
});

// 2. Push vitals directly to the patient's dashboard
await client.logVitals({
  patientId: 1,
  heartRate: 72,
  steps: 3500
});`}
        </pre>
      </div>
    </div>
  )
}
