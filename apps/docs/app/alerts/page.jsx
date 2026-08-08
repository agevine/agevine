export default function AlertsDocsPage() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Alerts Engine</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        The Alerts Engine is a core component built into the API Gateway that monitors incoming telemetry (wearables, voice, and IoT data) in real-time and triggers notifications when configurable thresholds are breached.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>How It Works</h3>
      <p>
        Every time a webhook hits <code>/api/v1/wearables/webhook</code> or <code>/api/v1/iot/webhook</code>, the Alerts Engine asynchronously evaluates all active rules for the given patient. If a threshold is crossed (e.g. <code>heartRate &gt; 120</code>), a notification is dispatched.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Notification Channels</h3>
      <ul>
        <li><strong>Email:</strong> Requires the <code>SENDGRID_API_KEY</code> environment variable.</li>
        <li><strong>SMS:</strong> Requires the <code>TWILIO_ACCOUNT_SID</code> and <code>TWILIO_AUTH_TOKEN</code> environment variables.</li>
        <li><strong>Webhooks:</strong> Perfect for sending alerts to Slack, Discord, or PagerDuty without any external paid dependencies.</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Managing Rules</h3>
      <p>
        Caregivers can manage alert rules dynamically from the UI Dashboard by navigating to the <strong>Alerts Engine</strong> page in the sidebar. The UI allows them to create rules based on heart rate, steps, blood oxygen, or fall detection.
      </p>
    </div>
  )
}
