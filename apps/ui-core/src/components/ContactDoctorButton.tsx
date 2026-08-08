"use client";

import { useState } from "react";
import { Mail, X, Send } from "lucide-react";

export function ContactDoctorButton({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setIsOpen(false);
        setMessage("");
        setSubject("");
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#059669] text-white rounded-lg font-semibold shadow-sm hover:bg-[#047857] transition-colors flex items-center justify-center"
      >
        Contact Doctor
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#059669]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Doctor</h2>
            <p className="text-gray-500 text-sm mb-6">Send a secure message to {email}</p>
            
            {isSent ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 mt-2">The doctor has been notified.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                  <input 
                    type="text" required
                    value={subject} onChange={e => setSubject(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-[#059669] outline-none"
                    placeholder="e.g. Recent Heart Rate Spike"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    required rows={4}
                    value={message} onChange={e => setMessage(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm font-medium focus:ring-2 focus:ring-[#059669] outline-none resize-none"
                    placeholder="Describe the issue or ask a question..."
                  />
                </div>
                <button 
                  type="submit" disabled={isSending}
                  className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center disabled:opacity-70"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Secure Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
