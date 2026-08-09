"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Search } from "lucide-react";

export function Topbar() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
        const res = await fetch(`${apiUrl}/api/alerts/history`);
        if (res.ok) {
          const data = await res.json();
          setAlerts(data.slice(0, 5)); // Show latest 5
        }
      } catch (e) {
        console.error("Failed to fetch notifications");
      }
    }
    fetchAlerts();
    
    // Poll every 30s
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = alerts.length; // For simplicity, we just show count of latest alerts

  return (
    <div className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        {/* Search removed for MVP */}
      </div>
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-zinc-400 hover:text-zinc-600 transition-colors bg-zinc-50 hover:bg-zinc-100 rounded-full"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-lg border border-zinc-200/60 overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
              <h3 className="font-bold text-sm text-zinc-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-zinc-500">
                  No new notifications
                </div>
              ) : (
                alerts.map((alert, i) => (
                  <div key={alert.id || i} className="px-4 py-3 border-b border-zinc-50 hover:bg-zinc-50/80 transition-colors last:border-0">
                    <p className="text-sm font-medium text-zinc-900 leading-snug">{alert.message}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
