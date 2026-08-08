import Link from "next/link";

export default async function PatientProfilePage({ params }: { params: { id: string } }) {
  // Wait for params in Next.js 15+ or destructure directly in Next.js 14
  const { id } = await params;

  return (
    <div className="p-10 flex flex-col gap-8">
      <header className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
          <Link href="/dashboard/patients" className="hover:underline">Patients</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Profile {id}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-1">Patient Profile</h1>
            <p className="text-sm text-gray-500">View real-time health data and configure integrations.</p>
          </div>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-emerald-800 transition-colors">
            Edit Patient
          </button>
        </div>
      </header>
      
      {/* Webhook Configuration Section */}
      <section className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
          Wearables SDK Integration
        </h2>
        <p className="text-sm text-blue-800 mb-4">
          To send data from the open-source Wearables SDK directly to this patient's profile, use the following credentials in your mobile app configuration:
        </p>
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto shadow-inner">
          <div className="mb-2"><span className="text-slate-400">// Base Webhook URL</span></div>
          <div className="mb-4">POST http://localhost:3001/api/v1/wearables/webhook</div>
          
          <div className="mb-2"><span className="text-slate-400">// Required JSON Payload Structure</span></div>
          <div>{`{`}</div>
          <div className="pl-4">{`"patientId": ${id},`}</div>
          <div className="pl-4">{`"heartRate": 75,`}</div>
          <div className="pl-4">{`"steps": 5200,`}</div>
          <div className="pl-4">{`"bloodOxygen": 98`}</div>
          <div>{`}`}</div>
        </div>
      </section>

      {/* Real-Time Monitor */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Live Vitals Monitor</h2>
          <span className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Listening for SDK data...
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-gray-500 font-medium">Waiting for first sync</p>
          <p className="text-sm text-gray-400 mt-1">Send a POST request from the Wearables SDK to see data appear here.</p>
        </div>
      </section>

    </div>
  );
}
