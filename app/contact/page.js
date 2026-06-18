"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONTACT_INFO = [
  { icon: "📍", title: "Head Office",    body: "No. 47, Galle Road, Colombo 03, Sri Lanka" },
  { icon: "📞", title: "Phone",          body: "+94 11 234 5678" },
  { icon: "✉️", title: "Email",          body: "support@ecomlanka.lk" },
  { icon: "🕒", title: "Business Hours", body: "Mon–Fri 8AM–6PM | Sat 9AM–1PM (SLT)" },
];

const TOPICS = [
  "General Inquiry",
  "Supplier Registration",
  "Buyer Support",
  "Technical Issue",
  "Trade Assurance",
  "Partnership",
  "Media / Press",
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", topic: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // TODO: submit to Laravel API
    setLoading(false);
    setSent(true);
  }

  return (
    <>
      <Header />
      <Navbar />

      {/* Page header */}
      <div className="py-12 text-white text-center px-4"
        style={{ background: "#0C1E35" }}>
        <h1 className="text-3xl font-black">Contact Us</h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>
          We're here to help — reach out and we'll respond within 24 hours.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Contact info */}
          <div>
            <h2 className="font-black text-lg mb-6" style={{ color: "#0C1E35" }}>Get in Touch</h2>
            <div className="space-y-5">
              {CONTACT_INFO.map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "#0C1E35" }}>{title}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-8">
              <div className="font-bold text-sm mb-3" style={{ color: "#0C1E35" }}>Follow Us</div>
              <div className="flex gap-3">
                {["LinkedIn", "Twitter", "Facebook", "Instagram"].map(s => (
                  <button key={s}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200
                               text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2">
            {sent ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-black mb-2" style={{ color: "#0C1E35" }}>Message Sent!</h3>
                <p className="text-sm text-gray-500">
                  Thank you for reaching out. Our team will respond to <strong>{form.email}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 border border-gray-100"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                <h2 className="font-black text-lg mb-6" style={{ color: "#0C1E35" }}>Send a Message</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#374151" }}>Full Name *</label>
                    <input required value={form.name} onChange={e => setF("name", e.target.value)}
                      placeholder="John Smith"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "#374151" }}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setF("email", e.target.value)}
                      placeholder="john@company.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "#374151" }}>Topic</label>
                  <select value={form.topic} onChange={e => setF("topic", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Select a topic…</option>
                    {TOPICS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "#374151" }}>Message *</label>
                  <textarea required value={form.message} onChange={e => setF("message", e.target.value)}
                    rows={5} placeholder="Describe your question or inquiry…"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none
                               focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl text-white font-bold text-sm
                             disabled:opacity-60 transition-opacity"
                  style={{ background: "#E8820C" }}>
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
