import Link from 'next/link';

export default async function PatientsPage() {
  let patients: any[] = [];
  try {
    const res = await fetch('http://localhost:3001/api/patients', { cache: 'no-store' });
    if (res.ok) {
      patients = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch patients API");
  }

  return (
    <div className="p-10 flex flex-col gap-8">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-1">Patients</h1>
          <p className="text-sm text-gray-500">Manage the loved ones you are monitoring.</p>
        </div>
        <button className="bg-emerald-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-emerald-800 transition-colors">
          Add Patient
        </button>
      </header>
      
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Phone Number</th>
              <th scope="col" className="px-6 py-4 font-medium">Timezone</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{patient.fullName}</td>
                  <td className="px-6 py-4">{patient.phoneNumber || "Not provided"}</td>
                  <td className="px-6 py-4">{patient.timezone}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/patients/${patient.id}`} className="text-emerald-600 hover:text-emerald-900 font-medium text-sm">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
