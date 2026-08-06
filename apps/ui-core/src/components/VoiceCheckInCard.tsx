"use client";

import { useState } from "react";

export function VoiceCheckInCard({ message, status }: { message: string, status: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) {
      // For a real audio element, we would pause it.
      // We will implement an audio ref to control it.
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      const cleanMessage = message.replace(/Patient:/g, "").replace(/AI:/g, "");
      
      const res = await fetch("http://localhost:3005/api/v1/voice/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanMessage })
      });

      if (!res.ok) throw new Error("Failed to synthesize");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
      
      audio.onerror = () => {
        console.warn("Audio playback failed, likely using the dummy silent buffer.");
        // Simulate playback duration for the dummy buffer so the UI animates
        setTimeout(() => setIsPlaying(false), 3000);
      };

      await audio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
      // Simulate playback for UI testing if backend fails
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col justify-between relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2 flex justify-between items-center">
          AI VOICE CHECK-IN
          <div className="flex gap-2">
            <button 
              onClick={handlePlay}
              className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm transition-colors ${isPlaying ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-100'}`}
              title={isPlaying ? "Stop" : "Play Recording"}
            >
              {isPlaying ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10"></rect></svg>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
              )}
            </button>
            <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
        </h3>
        <p className="text-gray-800 font-medium italic mt-4 text-sm line-clamp-3">
          "{message}"
        </p>
        
        {/* Audio Waveform */}
        <div className="flex items-center gap-1 mt-4 h-6 opacity-60">
           {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 bg-green-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} 
                style={{ 
                  height: `${isPlaying ? Math.max(20, Math.random() * 100) : 20}%`, 
                  animationDelay: `${i * 0.1}s`,
                  transition: 'height 0.2s ease'
                }}>
              </div>
           ))}
        </div>
      </div>
      <div className="text-xs font-bold text-green-700 mt-4 relative z-10">
        {status}
      </div>
    </div>
  );
}
