export default function Page() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Agevine</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        Agevine is the open-source operating system for eldercare AI. It allows you to unify health data from smartwatches and AI Voice Callers into a single, beautifully designed dashboard.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#059669' }}>@agevine/voice SDK</h3>
          <p>Easily integrate AI Voice Callers like Retell AI, Vapi, and Bland AI directly into your self-hosted dashboard. Listen to call recordings and view AI-generated sentiment analysis.</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#059669' }}>@agevine/wearables SDK</h3>
          <p>Stream live heart rate and step count data from Apple Watch, Fitbit, and Garmin straight to your database. Fully HIPAA compliant when self-hosted.</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#059669' }}>@agevine/iot SDK</h3>
          <p>Ingest data from non-wearable smart home sensors like fall detection mats, bed sensors, and BLE wristbands via MQTT and webhooks.</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, color: '#059669' }}>Alerts Engine</h3>
          <p>Configure custom rules (e.g. Heart Rate &gt; 120 bpm) to trigger immediate SMS, Email, or Webhook notifications to family members.</p>
        </div>
      </div>

      <h2 style={{ fontSize: '2rem', marginTop: '4rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>Quickstart Guide</h2>
      <p>The absolute easiest way to get Agevine running is using our pre-configured Docker Compose stack. This single command will spin up the entire microservice architecture (PostgreSQL, API Gateway, and Dashboard UI) on your local machine or cloud server.</p>
      
      <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', overflowX: 'auto' }}>
        <code style={{ fontFamily: 'monospace' }}>
          # 1. Clone the repository{'\n'}
          git clone https://github.com/agevine/agevine.git{'\n'}
          {'\n'}
          cd agevine{'\n\n'}
          {'\n'}
          # 2. Boot up the entire stack{'\n'}
          docker-compose up -d
        </code>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Accessing the Dashboard</h3>
      <p>Once the Docker containers are running, simply open your browser and navigate to <strong>http://localhost:3001</strong>. The default administrator password is <code>agevine</code>.</p>
    </div>
  )
}
