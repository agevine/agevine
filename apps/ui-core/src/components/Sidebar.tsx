import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-cream flex flex-col p-6 shadow-sm min-h-screen">
      <div className="mb-10 text-xl font-bold tracking-tight text-forest flex items-center gap-2">
        <Leaf className="w-6 h-6" />
        Agevine
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Overview
        </Link>
        <Link href="/dashboard/patients" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Patients
        </Link>
        <Link href="/dashboard/voice-logs" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          AI Voice Logs
        </Link>
        <Link href="/dashboard/alerts" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Alerts
        </Link>
        <Link href="/dashboard/settings" className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
