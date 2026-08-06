export default async function VoiceLogsPage() {
  let logs: any[] = [];
  try {
    const res = await fetch('http://localhost:3001/api/voice-logs', { cache: 'no-store' });
    if (res.ok) {
      logs = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch voice logs API");
  }

  return (
    <div className="p-10 flex flex-col gap-8">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-1">AI Voice Logs</h1>
          <p className="text-sm text-gray-500">Historical transcripts from daily AI check-ins.</p>
        </div>
      </header>
      
      <div className="flex flex-col gap-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${log.sentimentScore > 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  Sentiment: {log.sentimentScore}/100
                </span>
              </div>
              <p className="text-gray-800 text-lg italic border-l-4 border-emerald-500 pl-4">
                "{log.transcript}"
              </p>
              {log.cognitiveFlag && (
                <div className="mt-4 text-xs font-medium text-rose-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Cognitive anomaly detected
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-gray-500 text-center py-4">No historical logs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
