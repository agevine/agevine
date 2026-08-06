export default function VoicePage() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI Voice SDK</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        The `@agevine/voice` SDK integrates AI voice callers (like Retell AI or Bland AI) into your Agevine dashboard to keep track of daily check-ins.
      </p>

      <h3 style={{ marginTop: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>Installation</h3>
      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <code style={{ fontFamily: 'monospace' }}>
          npm install @agevine/voice
        </code>
      </div>

      <h3 style={{ marginTop: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>Usage</h3>
      <p>Use this inside your webhook handlers when a phone call completes.</p>
      
      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontFamily: 'monospace' }}>
          {`import { AgevineVoiceClient } from '@agevine/voice';

const client = new AgevineVoiceClient({ 
  endpoint: 'http://localhost:3001' 
});

// Log the call summary and sentiment
await client.logCall({
  patientId: 1,
  sentimentScore: 85,
  summary: "Patient is feeling well today."
});`}
        </pre>
      </div>
    </div>
  )
}
