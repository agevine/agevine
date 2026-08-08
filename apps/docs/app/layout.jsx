export const metadata = {
  title: 'Agevine Documentation',
  description: 'The open-source operating system for eldercare AI'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0, backgroundColor: '#fafafa', color: '#111' }}>
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #eaeaea', padding: '1.5rem 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#059669' }}>Agevine Documentation</h1>
          </div>
        </header>
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
          <aside style={{ width: '250px', borderRight: '1px solid #eaeaea', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#666', letterSpacing: '0.05em' }}>Overview</h3>
            <a href="/" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>Introduction & Quickstart</a>
            <a href="/patients" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>Patient Management</a>
            <a href="/settings" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>Settings & Data</a>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#666', letterSpacing: '0.05em', marginTop: '1rem' }}>Core Systems</h3>
            <a href="/alerts" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>Alerts Engine</a>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#666', letterSpacing: '0.05em', marginTop: '1rem' }}>SDK Reference</h3>
            <a href="/wearables" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>Wearables SDK</a>
            <a href="/voice" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>AI Voice SDK</a>
            <a href="/iot" style={{ textDecoration: 'none', color: '#111', fontWeight: '500' }}>IoT SDK</a>
          </aside>
          <main style={{ flex: 1, padding: '2rem 4rem' }}>
            {children}
          </main>
        </div>
        <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #eaeaea', padding: '2rem', textAlign: 'center', color: '#666' }}>
          AGPLv3 {new Date().getFullYear()} © Agevine. The Open-Source Eldercare OS.
        </footer>
      </body>
    </html>
  )
}
