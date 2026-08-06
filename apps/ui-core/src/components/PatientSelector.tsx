"use client";

import { useRouter } from "next/navigation";

export function PatientSelector({ patients, currentPatientId }: { patients: any[], currentPatientId: number }) {
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    router.push(`/dashboard?patientId=${val}`);
  };

  return (
    <div className="relative">
      <select 
        value={currentPatientId || ""} 
        onChange={handleChange}
        className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-[#059669] cursor-pointer hover:border-gray-400 transition-colors"
      >
        {patients.map(p => (
          <option key={p.id} value={p.id}>{p.fullName}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  );
}
