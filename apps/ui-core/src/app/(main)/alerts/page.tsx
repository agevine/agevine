"use client";

import { useState, useEffect } from "react";
import { Bell, ShieldAlert, CheckCircle2, Activity, Smartphone, Mail, Globe } from "lucide-react";

export default function AlertsPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Rule Form State
  const [metric, setMetric] = useState("heartRate");
  const [condition, setCondition] = useState("gt");
  const [threshold, setThreshold] = useState("100");
  const [channel, setChannel] = useState("sms");
  const [destination, setDestination] = useState("");

  const loadAlerts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
      // Mock patientId=1 for demo purposes
      const [rulesRes, historyRes] = await Promise.all([
        fetch(`${apiUrl}/api/alerts/rules?patientId=1`),
        fetch(`${apiUrl}/api/alerts/history?patientId=1`)
      ]);
      
      if (rulesRes.ok) setRules(await rulesRes.json());
      if (historyRes.ok) setHistory(await historyRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const createRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
      await fetch(`${apiUrl}/api/alerts/rules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: 1, metric, condition, threshold, channel, destination })
      });
      loadAlerts();
      setDestination("");
    } catch (error) {
      console.error("Failed to create rule");
    }
  };

  const deleteRule = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';
      await fetch(`${apiUrl}/api/alerts/rules/${id}`, { method: "DELETE" });
      loadAlerts();
    } catch (error) {
      console.error("Failed to delete rule");
    }
  };

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div></div>;
  }

  return (
    <div className="flex-1 p-10 bg-[#fafafa]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827] mb-2 flex items-center gap-3">
          <Bell className="w-8 h-8 text-forest" />
          Alerts Engine
        </h1>
        <p className="text-gray-500 font-medium">Configure automated notifications for critical health events.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Rules Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Active Alert Rules</h2>
            
            {rules.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No active rules configured.</p>
            ) : (
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          If {rule.metric} is {rule.condition === 'gt' ? '>' : rule.condition === 'lt' ? '<' : '=='} {rule.threshold}
                        </p>
                        <p className="text-gray-500 text-xs font-medium flex items-center gap-1 mt-1">
                          {rule.channel === 'sms' ? <Smartphone className="w-3 h-3" /> : rule.channel === 'email' ? <Mail className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                          Send {rule.channel} to {rule.destination}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteRule(rule.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Alert History */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Recent Triggers</h2>
            <div className="space-y-0">
              {history.map((event) => (
                <div key={event.id} className="py-4 border-b border-gray-50 last:border-0 flex items-start gap-4">
                  <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${event.status === 'sent' ? 'bg-forest' : 'bg-red-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">{event.message}</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                      {new Date(event.createdAt).toLocaleString()} • Sent via {event.channel}
                    </p>
                  </div>
                </div>
              ))}
              {history.length === 0 && <p className="text-gray-500 text-sm py-4">No recent alerts triggered.</p>}
            </div>
          </div>
        </div>

        {/* Create Rule Column */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Create New Rule</h2>
            
            <form onSubmit={createRule} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Metric</label>
                <select 
                  value={metric} onChange={e => setMetric(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest focus:border-forest outline-none"
                >
                  <option value="heartRate">Heart Rate (bpm)</option>
                  <option value="steps">Step Count</option>
                  <option value="bloodOxygen">Blood Oxygen (%)</option>
                  <option value="fallDetected">Fall Detected (1/0)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Condition</label>
                  <select 
                    value={condition} onChange={e => setCondition(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                  >
                    <option value="gt">Greater Than</option>
                    <option value="lt">Less Than</option>
                    <option value="eq">Equals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Value</label>
                  <input 
                    type="number" value={threshold} onChange={e => setThreshold(e.target.value)} required
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Delivery Channel</label>
                <select 
                  value={channel} onChange={e => setChannel(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                >
                  <option value="sms">SMS Text Message</option>
                  <option value="email">Email Notification</option>
                  <option value="webhook">Custom Webhook (Slack/Discord)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Destination</label>
                <input 
                  type="text" value={destination} onChange={e => setDestination(e.target.value)} required
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-forest outline-none"
                  placeholder={channel === 'email' ? 'doctor@hospital.com' : channel === 'sms' ? '+15551234567' : 'https://hooks.slack.com/...'}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-forest hover:bg-[#0F4C3A] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-5 h-5" />
                Save Alert Rule
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
