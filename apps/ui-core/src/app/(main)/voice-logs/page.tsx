"use client";

import { useState, useEffect } from "react";
import { Mic, PhoneCall, Play, Clock, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { SentimentChart } from "@/components/SentimentChart";

// Helper to parse raw transcript into chat bubbles
function parseTranscript(text: string) {
  if (!text) return [];
  const lines = text.split('\n').filter(l => l.trim() !== '');
  const parsed = [];
  let currentSpeaker = 'AI';
  
  for (const line of lines) {
    if (line.toLowerCase().startsWith('ai:') || line.toLowerCase().startsWith('assistant:')) {
      currentSpeaker = 'AI';
      parsed.push({ speaker: 'AI', text: line.replace(/^(ai|assistant):\s*/i, '').trim() });
    } else if (line.toLowerCase().startsWith('patient:') || line.toLowerCase().startsWith('user:')) {
      currentSpeaker = 'Patient';
      parsed.push({ speaker: 'Patient', text: line.replace(/^(patient|user):\s*/i, '').trim() });
    } else {
      // If no prefix, assume it belongs to the previous speaker or it's a new block
      parsed.push({ speaker: currentSpeaker, text: line.trim() });
    }
  }
  return parsed.length > 0 ? parsed : [{ speaker: 'System', text: text }];
}

export default function VoiceLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLogId, setSelectedLogId] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchLogs() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
        const res = await fetch(`${apiUrl}/api/voice-logs`);
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            setLogs(data);
            if (data.length > 0) setSelectedLogId(data[0].id);
          }
        }
      } catch(e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchLogs();
    return () => { mounted = false; };
  }, []);

  const selectedLog = logs.find(l => l.id === selectedLogId) || logs[0];

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Voice Check-ins</h1>
          <p className="text-gray-500 mt-2">Review transcripts and summaries from automated AI calls.</p>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-forest" />
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-zinc-200/60 text-center text-zinc-500">
          <Mic className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
          <p className="font-bold text-lg text-zinc-700">No Check-ins Yet</p>
          <p className="mt-1">Connect the Twilio integration to start automated AI calls.</p>
        </div>
      ) : (
        <>
          <SentimentChart logs={logs} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2">
              <div className="font-semibold text-gray-900 px-2 sticky top-0 bg-[#fafafa] py-2 z-10">Recent Calls</div>
              {logs.map((log) => {
                const dateStr = new Date(log.timestamp).toLocaleDateString();
                const timeStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const isSelected = selectedLogId === log.id;
                
                return (
                  <div 
                    key={log.id} 
                    onClick={() => setSelectedLogId(log.id)}
                    className={`p-5 rounded-2xl shadow-sm border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-forest/5 border-forest ring-1 ring-forest' 
                        : 'bg-white border-zinc-100 hover:border-forest/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-zinc-900">Patient #{log.patientId}</span>
                      <span className="text-xs text-zinc-400 font-medium">{dateStr}</span>
                    </div>
                    <div className="flex items-center text-xs text-zinc-500 mb-3 space-x-3">
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {log.durationSeconds}s</span>
                      <span className="flex items-center"><PhoneCall className="w-3 h-3 mr-1" /> Outbound</span>
                    </div>
                    <div className="text-sm text-zinc-600 line-clamp-2">
                      "{log.summary}"
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden h-[800px] flex flex-col">
                {selectedLog ? (
                  <>
                    <div className="px-8 py-6 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold text-zinc-900 mb-1">Call Transcript</h2>
                        <p className="text-sm text-zinc-500">
                          {new Date(selectedLog.timestamp).toLocaleDateString()} • {new Date(selectedLog.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {selectedLog.sentimentScore >= 70 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Positive ({selectedLog.sentimentScore})
                          </span>
                        ) : selectedLog.sentimentScore <= 39 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            <AlertTriangle className="w-4 h-4 mr-1.5" /> Negative ({selectedLog.sentimentScore})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                            <Clock className="w-4 h-4 mr-1.5" /> Neutral ({selectedLog.sentimentScore})
                          </span>
                        )}
                        <button className="p-3 bg-forest text-white rounded-full hover:bg-forest/90 transition-colors shadow-sm">
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-zinc-50/50">
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs text-zinc-400 font-bold shadow-sm">
                          Call Connected
                        </span>
                      </div>
                      
                      {parseTranscript(selectedLog.transcript).map((line, i) => (
                        <div key={i} className={`flex flex-col ${line.speaker === 'AI' ? 'items-end' : 'items-start'}`}>
                          <span className="text-xs text-zinc-400 mb-1 px-1 font-bold">{line.speaker}</span>
                          <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                            line.speaker === 'AI' 
                              ? 'bg-forest text-white rounded-tr-sm' 
                              : 'bg-white border border-zinc-200 text-zinc-900 rounded-tl-sm font-medium'
                          }`}>
                            {line.text}
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center mt-8">
                        <span className="inline-block px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs text-zinc-400 font-bold shadow-sm">
                          Call Disconnected
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 border-t border-zinc-100 bg-white">
                      <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50">
                        <div className="flex items-center mb-2">
                          <Mic className="w-4 h-4 text-forest mr-2" />
                          <span className="font-bold text-sm text-forest">AI Summary Generated</span>
                        </div>
                        <p className="text-sm text-zinc-700 leading-relaxed font-medium">{selectedLog.summary}</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
