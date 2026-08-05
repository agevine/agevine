export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-white flex flex-col p-6 shadow-sm">
        <div className="mb-10 text-xl font-bold tracking-tight text-emerald-800 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          Agevine
        </div>
        <nav className="flex flex-col gap-2">
          <a href="#" className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors">Overview</a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Patients</a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">AI Voice Logs</a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Alerts</a>
          <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Settings</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 flex flex-col gap-8">
        <header className="flex justify-between items-center pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-1">Mom's Status</h1>
            <p className="text-sm text-gray-500">Here is the latest health snapshot for your loved ones.</p>
          </div>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-emerald-800 transition-colors">
            Contact Doctor
          </button>
        </header>

        {/* Vitals Metrics Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Heart Rate Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Avg Resting Heart Rate</h3>
              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">72 <span className="text-lg font-normal text-gray-500">bpm</span></div>
              <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                2 bpm from last week (Healthy)
              </p>
            </div>
          </div>

          {/* Steps Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Steps Today</h3>
              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">3,420</div>
              <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                On track for 5k goal
              </p>
            </div>
          </div>

          {/* AI Checkin Card */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-emerald-800 uppercase tracking-wider">AI Voice Check-in</h3>
              <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-900 mt-1">"I slept well and I'm having tea."</div>
              <p className="text-xs font-medium text-emerald-700 mt-2">
                All Good • 10 mins ago
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
