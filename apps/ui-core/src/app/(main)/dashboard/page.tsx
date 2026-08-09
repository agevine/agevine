import { VitalsChart } from "@/components/VitalsChart";
import { PatientSelector } from "@/components/PatientSelector";
import { VoiceCheckInCard } from "@/components/VoiceCheckInCard";
import { ContactDoctorButton } from "@/components/ContactDoctorButton";
import type { AlertEvent } from "@/lib/types";
import { API_URL } from "@/lib/api";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ patientId?: string }> }) {
  // Await searchParams for Next.js 15+ compatibility
  const params = await searchParams;
  const patientId = params?.patientId || '';

  let vitals = null;
  let allPatients = [];
  let activityLog: AlertEvent[] = [];

  try {
    const apiUrl = API_URL;
    // Fetch all patients for the dropdown
    const patientsRes = await fetch(`${apiUrl}/api/patients`, { cache: 'no-store' });
    if (patientsRes.ok) {
      allPatients = await patientsRes.json();
    }

    // Fetch vitals for the selected patient
    const url = patientId 
      ? `${apiUrl}/api/vitals?patientId=${patientId}` 
      : `${apiUrl}/api/vitals`;
      
    const res = await fetch(url, { cache: 'no-store' });
    
    if (res.ok) {
      vitals = await res.json();
    } else {
      throw new Error("Failed to fetch vitals");
    }

    // Fetch alert history for the activity log
    const historyUrl = patientId 
      ? `${apiUrl}/api/alerts/history?patientId=${patientId}` 
      : `${apiUrl}/api/alerts/history`;
    const historyRes = await fetch(historyUrl, { cache: 'no-store' });
    if (historyRes.ok) {
      activityLog = await historyRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    vitals = {
      patient: { fullName: "Unknown", deviceStatus: "Offline", deviceBattery: 0, doctorEmail: "doctor@example.com" },
      heartRate: "--",
      heartRateTrend: "API Offline",
      steps: 0,
      stepsTrend: "API Offline",
      checkInMessage: "Unable to connect to AI Voice service.",
      checkInStatus: "Offline"
    };
  }

  const patient = vitals.patient;
  const isOnline = patient?.deviceStatus === "Online";

  return (
    <div className="flex-1 p-10 bg-[#fafafa]">
      
      {/* Header Area with Status and Dropdown */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-[#111827]">{patient?.fullName}'s Status</h1>
            
            {/* Dynamic Online/Offline Badge */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border shadow-sm ${isOnline ? 'bg-green-50 text-green-700 border-green-200' : 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
              {isOnline ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              ) : (
                <span className="h-2 w-2 rounded-full bg-zinc-400"></span>
              )}
              {patient?.deviceStatus || 'Offline'}
            </div>
            
            {/* Dynamic Battery */}
            <div className="flex items-center gap-1 text-xs font-semibold text-zinc-500 bg-white border border-zinc-200 px-2.5 py-1 rounded-md shadow-sm">
              🔋 {patient?.deviceBattery || 0}%
            </div>
          </div>
          <p className="text-zinc-500 font-medium">Here is the latest health snapshot for your loved ones.</p>
        </div>
        <div className="flex gap-4">
          
          <PatientSelector patients={allPatients} currentPatientId={patient?.id} />

          <ContactDoctorButton email={patient?.doctorEmail || 'doctor@example.com'} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Heart Rate Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200/60 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex justify-between">
              AVG RESTING HEART RATE
              <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-zinc-900">{vitals.heartRate}</span>
              <span className="text-sm font-semibold text-zinc-400">bpm</span>
            </div>
          </div>
          <div className="text-xs font-bold text-[#059669] mt-4 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            {vitals.heartRateTrend}
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200/60 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex justify-between">
              STEPS TODAY
              <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-zinc-900">{vitals.steps?.toLocaleString() || 0}</span>
            </div>
          </div>
          <div className="text-xs font-bold text-[#059669] mt-4 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            {vitals.stepsTrend}
          </div>
        </div>

        {/* AI Voice Check-in Card */}
        <VoiceCheckInCard 
          message={vitals.checkInMessage} 
          status={vitals.checkInStatus} 
        />
      </div>

      <VitalsChart patientId={patientId} />
        
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200/60 mt-6">
        <div className="px-6 py-5 border-b border-zinc-200/60 flex justify-between items-center bg-zinc-50/50">
          <h2 className="font-bold text-zinc-900">Recent Activity Log</h2>
          <button className="text-sm text-[#059669] font-bold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-zinc-100">
          {activityLog.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-zinc-500">
              No recent activity recorded.
            </div>
          ) : (
            activityLog.slice(0, 5).map((activity, i) => (
              <div key={activity.id || i} className="px-6 py-4 flex items-start hover:bg-zinc-50 transition-colors cursor-pointer">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full mr-4 flex-shrink-0 ${activity.status === 'failed' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                <div className="flex-1">
                  <p className="font-bold text-zinc-900">System Notification</p>
                  <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{activity.message}</p>
                </div>
                <div className="flex items-center text-zinc-400 text-xs font-semibold whitespace-nowrap ml-4">
                  {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
