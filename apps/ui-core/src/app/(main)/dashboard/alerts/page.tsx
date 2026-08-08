export default function AlertsPage() {
  return (
    <div className="p-10 flex flex-col gap-8">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-1">Alerts</h1>
          <p className="text-sm text-gray-500">Critical health notifications and anomaly detections.</p>
        </div>
      </header>
      
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-sm">
        <p className="text-emerald-800 font-medium flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          No active alerts. All vital signs are normal.
        </p>
      </div>
    </div>
  );
}
