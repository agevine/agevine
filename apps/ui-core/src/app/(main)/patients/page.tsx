"use client";

import { useState, useEffect } from "react";
import { Battery, Activity, Smartphone, Phone, AlertCircle, X, Trash2, Key } from "lucide-react";
import type { Patient } from "@/lib/types";
import { API_URL } from "@/lib/api";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [timezone, setTimezone] = useState("UTC");

  const loadPatientsData = async (signal?: AbortSignal) => {
    const apiUrl = API_URL;
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
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') console.error("Failed to load patients", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const loadPatients = async () => {
    try {
      const res = await loadPatientsData();
      if (res.ok) setPatients(await res.json());
    } catch (e) {
      console.error("Failed to load patients", e);
    }
  };

  const addPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = API_URL;
      await fetch(`${apiUrl}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phoneNumber, doctorEmail, timezone })
      });
      setIsModalOpen(false);
      setFullName("");
      setPhoneNumber("");
      setDoctorEmail("");
      loadPatients();
    } catch (error) {
      console.error("Failed to add patient");
    }
  };

  const deletePatient = async (id: number) => {
    try {
      const apiUrl = API_URL;
      await fetch(`${apiUrl}/api/patients/${id}`, { method: "DELETE" });
      loadPatients();
    } catch (error) {
      console.error("Failed to delete patient");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div></div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Family</h1>
          <p className="text-gray-500 mt-2">Manage profiles, monitor connectivity, and pair devices.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-forest text-white font-medium rounded-full hover:bg-forest-light transition-colors shadow-sm"
        >
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patients.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400 mr-4">
                  {member.fullName.split(' ').map((n: string) => n[0]).join('').substring(0,2)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{member.fullName}</h2>
                  <p className="text-sm text-gray-500">Patient ID: <span className="font-mono bg-gray-100 px-1 rounded">{member.id}</span> • {member.timezone}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.deviceStatus === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.deviceStatus === 'Online' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
                  {member.deviceStatus}
                </span>
                <button 
                  onClick={() => setDeleteConfirmId(member.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                  title="Delete Patient"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center">
                <Phone className="w-5 h-5 text-gray-400 mb-2" />
                <p className="text-xs font-bold text-gray-900 truncate w-full">{member.phoneNumber || 'No phone'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center">
                <Activity className="w-5 h-5 text-gray-400 mb-2" />
                <p className="text-xs font-bold text-gray-900 truncate w-full">{member.doctorEmail || 'No doc email'}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center">
                <Key className="w-5 h-5 text-gray-400 mb-2" />
                <p className="text-xs font-bold text-gray-900 truncate w-full">API Key Gen</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Smartphone className="w-4 h-4 mr-2" />
                Apple Watch / Oura
                <div className="mx-2 w-1 h-1 bg-gray-300 rounded-full" />
                <Battery className={`w-4 h-4 mr-1 ${(member.deviceBattery ?? 0) < 20 ? 'text-red-500' : 'text-emerald-500'}`} />
                <span className={(member.deviceBattery ?? 0) < 20 ? 'text-red-500 font-medium' : ''}>{member.deviceBattery ?? 0}%</span>
              </div>
            </div>
          </div>
        ))}
        {patients.length === 0 && (
          <div className="col-span-1 md:col-span-2 py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No patients added yet</h3>
            <p className="text-gray-500">Click the button above to add a family member to Agevine.</p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Family Member</h2>
            <form onSubmit={addPatient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                  placeholder="e.g. Margaret Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                  placeholder="+15551234567"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Doctor's Email</label>
                <input 
                  type="email" value={doctorEmail} onChange={e => setDoctorEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                  placeholder="doctor@hospital.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Timezone</label>
                <select 
                  value={timezone} onChange={e => setTimezone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-forest hover:bg-[#0F4C3A] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm mt-6"
              >
                Create Profile
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl text-center relative">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Patient?</h2>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete this patient? All their history (vitals, voice logs, alerts) will be permanently deleted!</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => deletePatient(deleteConfirmId)}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
