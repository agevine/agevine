"use client";

import { useState, useEffect } from "react";
import { User, Key, Download, CheckCircle2, XCircle, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "integrations" | "data">("profile");
  
  // Profile State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  // System Status State
  const [systemStatus, setSystemStatus] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
        
        // Fetch User
        const userRes = await fetch(`${apiUrl}/api/user`);
        if (userRes.ok) {
          const user = await userRes.json();
          if (mounted && user) {
            setFullName(user.fullName || "");
            setEmail(user.email || "");
          }
        }

        // Fetch System Status
        const statusRes = await fetch(`${apiUrl}/api/system/status`);
        if (statusRes.ok) {
          const status = await statusRes.json();
          if (mounted) setSystemStatus(status);
        }
      } catch (error) {
        console.error("Failed to load settings data:", error);
      }
    };
    
    void fetchData();
    return () => { mounted = false; };
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
      const res = await fetch(`${apiUrl}/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email })
      });
      if (res.ok) {
        setProfileMessage("Profile updated successfully.");
        window.dispatchEvent(new Event('userProfileUpdated'));
      } else {
        setProfileMessage("Failed to update profile.");
      }
    } catch (error) {
      setProfileMessage("An error occurred while saving.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleExport = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
    window.open(`${apiUrl}/api/system/export`, "_blank");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account, view active integrations, and export your data.</p>
      </div>

      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'profile' ? 'text-forest' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </div>
          {activeTab === 'profile' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest rounded-t-full" />}
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'integrations' ? 'text-forest' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="flex items-center">
            <Key className="w-4 h-4 mr-2" />
            Integrations
          </div>
          {activeTab === 'integrations' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest rounded-t-full" />}
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'data' ? 'text-forest' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Data Management
          </div>
          {activeTab === 'data' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest rounded-t-full" />}
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Caregiver Profile</h2>
          <form onSubmit={saveProfile} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
              />
            </div>
            
            <div className="pt-4 flex items-center gap-4">
              <button 
                type="submit"
                disabled={savingProfile}
                className="flex items-center bg-forest hover:bg-[#0F4C3A] text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
              {profileMessage && (
                <span className="text-sm font-medium text-green-600">{profileMessage}</span>
              )}
            </div>
          </form>
        </div>
      )}

      {activeTab === "integrations" && (
        <div className="grid gap-6 max-w-3xl">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">System Integrations</h2>
            <p className="text-sm text-gray-500 mb-8">
              These integrations are configured via environment variables in the <code>api-gateway</code>. 
              Restart your API server if you make changes to your <code>.env</code> file.
            </p>

            <div className="space-y-4">
              {/* Twilio */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900">Twilio AI Voice</h3>
                  <p className="text-xs text-gray-500 mt-1">Required for outbound daily AI phone calls.</p>
                </div>
                <div className="flex items-center">
                  {systemStatus?.twilio ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Missing Key
                    </span>
                  )}
                </div>
              </div>

              {/* SendGrid */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900">SendGrid Email</h3>
                  <p className="text-xs text-gray-500 mt-1">Required for sending email alerts from the Alerts Engine.</p>
                </div>
                <div className="flex items-center">
                  {systemStatus?.sendgrid ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Missing Key
                    </span>
                  )}
                </div>
              </div>

              {/* OpenAI */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900">OpenAI Services</h3>
                  <p className="text-xs text-gray-500 mt-1">Required for AI transcript summarization and analysis.</p>
                </div>
                <div className="flex items-center">
                  {systemStatus?.openai ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Missing Key
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "data" && (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Export Data</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Download a complete JSON backup of all telemetry data associated with this Agevine instance. 
            This includes patient profiles, historical vitals logs, voice call transcripts, and alert history. 
            This file is intended for personal backup or migration to hospital EMR systems.
          </p>
          
          <button 
            onClick={handleExport}
            className="flex items-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-5 h-5 mr-3" />
            Download agevine-export.json
          </button>
        </div>
      )}
    </div>
  );
}
