"use client";

import { useState, useEffect } from "react";
import { Smartphone, Battery, Activity, WifiOff, Plus, X, Watch, Info } from "lucide-react";

export default function DevicesPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPatientsData = async (signal?: AbortSignal) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
    return await fetch(`${apiUrl}/api/patients`, { signal });
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await loadPatientsData();
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          if (mounted) setPatients(data);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') console.error("Failed to load devices", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div></div>;
  }

  const totalDevices = patients.length;
  const onlineDevices = patients.filter(p => p.deviceStatus === 'Online').length;
  const lowBatteryDevices = patients.filter(p => p.deviceBattery < 20).length;

  return (
    <div className="flex-1 p-10 bg-[#fafafa]">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#111827] mb-2 flex items-center gap-3">
            <Watch className="w-8 h-8 text-forest" />
            Device Manager
          </h1>
          <p className="text-zinc-500 font-medium">Monitor connection status and battery levels for all paired wearables.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-forest text-white font-bold rounded-lg hover:bg-[#0F4C3A] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Pair New Device
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Watch className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Devices</p>
            <p className="text-2xl font-bold text-zinc-900">{totalDevices}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Online & Syncing</p>
            <p className="text-2xl font-bold text-zinc-900">{onlineDevices}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-zinc-200/60 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${lowBatteryDevices > 0 ? 'bg-red-50 text-red-600' : 'bg-zinc-50 text-zinc-400'}`}>
            <Battery className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Needs Charging</p>
            <p className="text-2xl font-bold text-zinc-900">{lowBatteryDevices}</p>
          </div>
        </div>
      </div>

      {/* Devices List */}
      <div className="bg-white rounded-xl border border-zinc-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200/60">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Family Member</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Device Type</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Battery Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {patients.map((patient) => {
              const isLowBattery = patient.deviceBattery < 20;
              const isOffline = patient.deviceStatus !== 'Online';
              
              return (
                <tr key={patient.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-500 text-xs">
                        {patient.fullName.split(' ').map((n:string) => n[0]).join('').substring(0,2)}
                      </div>
                      <span className="font-bold text-zinc-900 text-sm">{patient.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-600">
                    Smart Wearable
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      isOffline ? 'bg-zinc-100 text-zinc-600' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isOffline ? <WifiOff className="w-3 h-3 mr-1" /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />}
                      {patient.deviceStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isLowBattery ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${patient.deviceBattery}%` }}
                        />
                      </div>
                      <span className={`font-bold text-sm ${isLowBattery ? 'text-red-500' : 'text-zinc-600'}`}>
                        {patient.deviceBattery}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
            {patients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 text-sm">
                  No devices paired yet. Click "Pair New Device" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pair Device Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full relative shadow-xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 bg-zinc-50 hover:bg-zinc-100 p-2 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
              <Watch className="w-6 h-6 text-forest" />
              Pair New Wearable
            </h2>
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-blue-900 leading-relaxed">
                To connect a new Apple Watch or Oura Ring, you must configure the Agevine Wearables SDK in your mobile app to point to your secure webhook URL.
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-5 border border-slate-800 shadow-inner">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Webhook URL</div>
              <div className="font-mono text-sm text-green-400 mb-6 break-all">
                POST http://localhost:3005/api/v1/wearables/webhook
              </div>
              
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Required JSON Payload</div>
              <pre className="font-mono text-sm text-zinc-300">
{`{
  "patientId": 1,
  "heartRate": 72,
  "steps": 3500,
  "bloodOxygen": 98
}`}
              </pre>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-sm font-bold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
