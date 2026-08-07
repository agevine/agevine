import { Mic, PhoneCall, Play, Clock, CheckCircle2 } from "lucide-react";

export default function VoiceLogsPage() {
  const logs = [
    {
      id: "LOG-092",
      date: "Today, 9:00 AM",
      patient: "Robert Doe",
      duration: "1m 24s",
      sentiment: "Positive",
      summary: "Patient reported feeling good. Confirmed taking morning medication.",
      transcript: [
        { speaker: "AI", text: "Good morning Robert, how are you feeling today?" },
        { speaker: "Robert", text: "I'm doing pretty good today, thanks." },
        { speaker: "AI", text: "That's great to hear! Did you remember to take your morning pills?" },
        { speaker: "Robert", text: "Yep, took them right after breakfast." },
        { speaker: "AI", text: "Excellent. Have a wonderful day!" }
      ]
    },
    {
      id: "LOG-091",
      date: "Yesterday, 4:30 PM",
      patient: "Margaret Doe",
      duration: "2m 10s",
      sentiment: "Neutral",
      summary: "Patient reported feeling tired. Missed afternoon walk.",
      transcript: [
        { speaker: "AI", text: "Hi Margaret, checking in on your afternoon walk." },
        { speaker: "Margaret", text: "Oh, I was just too tired today. I skipped it." },
        { speaker: "AI", text: "I understand. Rest is important too. We'll try again tomorrow." }
      ]
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Voice Check-ins</h1>
          <p className="text-gray-500 mt-2">Review transcripts and summaries from automated AI calls.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="font-semibold text-gray-900 px-2">Recent Calls</div>
          {logs.map((log) => (
            <div key={log.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-primary/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-900">{log.patient}</span>
                <span className="text-xs text-gray-400 font-medium">{log.date}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {log.duration}</span>
                <span className="flex items-center"><PhoneCall className="w-3 h-3 mr-1" /> Outbound</span>
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                "{log.summary}"
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Morning Check-in</h2>
                <p className="text-sm text-gray-500">Robert Doe • Today, 9:00 AM</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Sentiment: Positive
                </span>
                <button className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-cream/50">
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-400 font-medium shadow-sm">
                  Call Connected at 9:00 AM
                </span>
              </div>
              
              {logs[0].transcript.map((line, i) => (
                <div key={i} className={`flex flex-col ${line.speaker === 'AI' ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs text-gray-400 mb-1 px-1 font-medium">{line.speaker}</span>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                    line.speaker === 'AI' 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-100 text-gray-900 rounded-tl-sm'
                  }`}>
                    {line.text}
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-8">
                <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-400 font-medium shadow-sm">
                  Call Disconnected at 9:01 AM
                </span>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-white">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center mb-2">
                  <Mic className="w-4 h-4 text-primary mr-2" />
                  <span className="font-semibold text-sm text-gray-900">AI Summary Generated</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{logs[0].summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
