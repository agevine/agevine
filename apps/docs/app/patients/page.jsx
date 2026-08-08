export default function PatientsDocsPage() {
  return (
    <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Patient Management</h2>
      <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '2rem' }}>
        Agevine includes a full Patient Management UI to easily add, monitor, and remove family members from the dashboard.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Adding a Patient</h3>
      <p>
        Navigate to the <strong>My Family</strong> tab in the dashboard and click <strong>+ Add Member</strong>. 
        You will need to provide their Name, Phone Number (for AI Voice Callers), Doctor's Email, and Timezone.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Pairing Devices</h3>
      <p>
        Once a patient is created, the UI will display their unique <code>Patient ID</code>. 
        You must use this ID when configuring Webhooks for their Apple Watch, Fitbit, or Smart Home sensors to ensure telemetry is routed to the correct profile.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Data Deletion Policy</h3>
      <p>
        Deleting a patient from the UI performs a <strong>Hard Delete</strong>. All of their historical vitals, voice logs, and alert history are permanently purged from the PostgreSQL database to ensure compliance with data privacy standards.
      </p>
    </div>
  )
}
