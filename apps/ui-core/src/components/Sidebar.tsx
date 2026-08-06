import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col p-6 shadow-sm min-h-screen">
      <div className="mb-10 text-xl font-bold tracking-tight text-emerald-800 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
        Agevine
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Overview
        </Link>
        <Link href="/patients" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Patients
        </Link>
        <Link href="/voice-logs" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          AI Voice Logs
        </Link>
        <Link href="/alerts" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Alerts
        </Link>
        <Link href="/settings" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
