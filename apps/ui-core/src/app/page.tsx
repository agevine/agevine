"use client";

import { useEffect, useState } from "react";
import { Heart, Activity, Watch, ChevronRight, Mic, PlayCircle } from "lucide-react";
import { MetricChart } from "@/components/MetricChart";

export default function Overview() {
  const [vitals, setVitals] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [vitalsRes, historyRes] = await Promise.all([
          fetch("http://localhost:3005/api/vitals"),
          fetch("http://localhost:3005/api/vitals/history")
        ]);
        
        if (vitalsRes.ok && historyRes.ok) {
          const vData = await vitalsRes.json();
          const hData = await historyRes.json();
          setVitals(vData);
          setHistory(hData);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-8 max-w-6xl mx-auto w-full flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div></div>;
  }

  const hrData = history.length > 0 ? history.map((d: any) => ({ time: d.time, hr: d.heartRate })) : [];
  const stData = history.length > 0 ? history.map((d: any) => ({ time: d.time, steps: d.steps })) : [];

  const patientName = vitals?.patient?.name || "Margaret Doe";
  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{patientName}'s Status</h1>
          <p className="text-gray-500 mt-2">Here is the latest health snapshot for your loved ones.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex items-center">
            {patientName}
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="px-5 py-2 bg-[#0F4C3A] text-white text-sm font-medium rounded-lg shadow-sm hover:bg-[#1A7057]">
            Contact Doctor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex items-center text-forest mb-4">
            <Heart className="w-5 h-5 mr-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500">AVG RESTING HEART RATE</h3>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-5xl font-bold text-gray-900 tracking-tight">{vitals?.heartRate || "--"}</span>
            <span className="text-gray-500 ml-2 font-medium">bpm</span>
          </div>
          <p className="text-sm text-forest font-medium mt-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-forest rounded-full mr-2" />
            Live from API Gateway
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          <div className="flex items-center text-blue-600 mb-4">
            <Activity className="w-5 h-5 mr-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500">STEPS TODAY</h3>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-5xl font-bold text-gray-900 tracking-tight">{vitals?.steps?.toLocaleString() || "0"}</span>
          </div>
          <p className="text-sm text-forest font-medium mt-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-forest rounded-full mr-2" />
            Live from API Gateway
          </p>
        </div>

        <div className="bg-[#f0fdf4] rounded-2xl p-6 shadow-sm border border-[#dcfce7]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xs text-forest uppercase tracking-wider">AI Voice Check-in</h3>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-forest"></span>
              </span>
              <Mic className="w-4 h-4 text-forest" />
            </div>
          </div>
          <p className="italic text-gray-700 text-sm mb-4 leading-relaxed">
            "{vitals?.checkInMessage || 'No recent check-in.'}"
          </p>
          <div className="flex items-center space-x-1 mb-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 9 ? 'bg-forest/40' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-xs font-bold text-forest">{vitals?.checkInStatus}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center text-gray-900 mb-2">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            <h3 className="font-bold">Heart Rate (Last 12 Readings)</h3>
          </div>
          <MetricChart data={hrData} color="#ef4444" dataKey="hr" />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center text-gray-900 mb-2">
            <Activity className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="font-bold">Step Count (Last 12 Readings)</h3>
          </div>
          <MetricChart data={stData} color="#3b82f6" dataKey="steps" />
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Recent Activity Log</h2>
          <button className="text-sm text-forest font-bold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { title: "Mom's Apple Watch Synced", time: "10 mins ago", type: "sync", desc: "Heart rate and steps successfully uploaded." },
            { title: "AI Voice Check-in Completed", time: "2 hours ago", type: "voice", desc: "Dad reported feeling well and took his morning medication." },
            { title: "Irregular Heart Rate Detected", time: "Yesterday", type: "alert", desc: "Mom's heart rate spiked to 110bpm during resting period." }
          ].map((activity, i) => (
            <div key={i} className="px-6 py-4 flex items-start hover:bg-white/60 transition-colors cursor-pointer">
              <div className={`mt-1 h-2.5 w-2.5 rounded-full mr-4 flex-shrink-0 ${activity.type === 'alert' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : activity.type === 'voice' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
              <div className="flex-1">
                <p className="font-bold text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.desc}</p>
              </div>
              <div className="flex items-center text-gray-400 text-sm font-medium">
                {activity.time}
                <ChevronRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
