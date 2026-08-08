export default function SettingsDocsPage() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Settings & System Configuration</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        The Agevine Settings page is your centralized hub for managing your caregiver profile, verifying third-party integrations, and ensuring data portability.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>System Integrations</h3>
      <p>
        Because Agevine is an open-source, self-hosted product, API keys for third-party services must be securely managed via the <code>.env</code> file located in your <code>api-gateway</code> directory. 
        The Settings page automatically detects if these keys are present and confirms their active status:
      </p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li><strong>Twilio</strong>: <code>TWILIO_ACCOUNT_SID</code></li>
        <li><strong>SendGrid</strong>: <code>SENDGRID_API_KEY</code></li>
        <li><strong>OpenAI</strong>: <code>OPENAI_API_KEY</code></li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Data Export (Interoperability)</h3>
      <p>
        Data ownership is a core pillar of Agevine. You can export a comprehensive JSON snapshot of your entire database at any time by navigating to <strong>Settings {'>'} Data Management</strong>.
        This export contains all Patient Profiles, Vitals Logs, Voice Transcripts, and Alert History.
      </p>
    </div>
  )
}
