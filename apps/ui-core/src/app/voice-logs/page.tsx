export default function VoiceLogsPage() {
  return (
    <div className="p-10 flex flex-col gap-8">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-1">AI Voice Logs</h1>
          <p className="text-sm text-gray-500">Historical transcripts from daily AI check-ins.</p>
        </div>
      </header>
      
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-500">No historical logs found.</p>
      </div>
    </div>
  );
}
