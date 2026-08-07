import { Battery, Activity, Smartphone, Phone, AlertCircle } from "lucide-react";

export default function PatientsPage() {
  const familyMembers = [
    {
      id: "1",
      name: "Margaret Doe",
      relation: "Mother",
      age: 72,
      location: "San Francisco, CA",
      status: "Online",
      lastSync: "Just now",
      device: { type: "Apple Watch Series 8", battery: 84 },
      vitals: { hr: 68, steps: 5400, bp: "118/76" },
      alerts: 0
    },
    {
      id: "2",
      name: "Robert Doe",
      relation: "Father",
      age: 76,
      location: "San Francisco, CA",
      status: "Offline",
      lastSync: "3 hours ago",
      device: { type: "Garmin Vivosmart", battery: 12 },
      vitals: { hr: 82, steps: 1200, bp: "135/88" },
      alerts: 1
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Family</h1>
          <p className="text-gray-500 mt-2">Manage profiles and monitor wearable connectivity.</p>
        </div>
        <button className="px-5 py-2.5 bg-forest text-white font-medium rounded-full hover:bg-forest-light transition-colors shadow-sm">
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400 mr-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                  <p className="text-sm text-gray-500">{member.relation} • {member.age} yrs • {member.location}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                member.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {member.status === 'Online' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
                {member.status}
              </span>
            </div>

            {member.alerts > 0 && (
              <div className="mb-6 p-3 bg-orange-50 border border-orange-100 rounded-xl flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800">Device battery is critically low. AI Voice check-in will ask him to charge it today.</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Heart Rate</p>
                <p className="text-xl font-bold text-gray-900">{member.vitals.hr} <span className="text-sm font-normal text-gray-500">bpm</span></p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Steps</p>
                <p className="text-xl font-bold text-gray-900">{member.vitals.steps}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Blood Pres.</p>
                <p className="text-xl font-bold text-gray-900">{member.vitals.bp}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Smartphone className="w-4 h-4 mr-2" />
                {member.device.type}
                <div className="mx-2 w-1 h-1 bg-gray-300 rounded-full" />
                <Battery className={`w-4 h-4 mr-1 ${member.device.battery < 20 ? 'text-red-500' : 'text-emerald-500'}`} />
                <span className={member.device.battery < 20 ? 'text-red-500 font-medium' : ''}>{member.device.battery}%</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary bg-white border border-gray-200 rounded-full shadow-sm hover:border-primary/50 transition-colors">
                  <Activity className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary bg-white border border-gray-200 rounded-full shadow-sm hover:border-primary/50 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
