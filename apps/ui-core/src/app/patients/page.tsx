export default function PatientsPage() {
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
      
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-500">No additional patients configured.</p>
      </div>
    </div>
  );
}
