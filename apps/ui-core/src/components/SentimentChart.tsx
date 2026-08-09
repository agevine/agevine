"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mic } from "lucide-react";

export function SentimentChart({ logs }: { logs: any[] }) {
  const chartData = useMemo(() => {
    if (!logs || logs.length === 0) return [];
    
    // Reverse logs to show oldest to newest (assuming API returns newest first)
    const reversed = [...logs].reverse();
    
    return reversed.map(log => ({
      date: new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: log.sentimentScore || 50,
      summary: log.summary
    }));
  }, [logs]);

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-gray-500 mb-8">
        <Mic className="w-8 h-8 text-gray-300 mb-2" />
        <p className="font-medium">No Voice Sentiment Data Available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Emotional Sentiment Trend
        </h3>
        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Positive (70-100)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Neutral (40-69)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Negative (0-39)</span>
        </div>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}} 
              dy={10} 
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9ca3af', fontSize: 12}} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
              formatter={(value: number | string | ReadonlyArray<number | string> | undefined, name: string | number | undefined) => {
                let mood = "Neutral";
                if (Number(value) >= 70) mood = "Positive";
                else if (Number(value) < 40) mood = "Negative";
                return [`${value}/100 (${mood})`, "Sentiment"];
              }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
