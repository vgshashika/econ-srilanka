"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { CATEGORIES, CERTIFICATIONS } from "@/lib/data";

const STEPS = [
  { num: 1, label: "Product Info" },
  { num: 2, label: "Requirements" },
  { num: 3, label: "Contact" },
  { num: 4, label: "Review" },
];

const INITIAL = {
  // Step 1
  productName: "", category: "", quantity: "", unit: "kg",
  targetPrice: "", currency: "USD", frequency: "one-time",
  // Step 2
  destination: "", deliveryDate: "", incoterms: "FOB",
  packaging: "", certifications: [], sampleRequired: false, notes: "",
  // Step 3
  fullName: "", email: "", company: "", phone: "", country: "",
};

export default function RFQPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function toggleCert(cert) {
    const arr = form.certifications;
    set("certifications", arr.includes(cert) ? arr.filter((c) => c !== cert) : [...arr, cert]);
  }

  async function handleSubmit() {
    setLoading(true);
    // TODO: await submitRFQ(form);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white";
  const labelCls = "block text-xs font-semibold mb-1.5 text-gray-700";

  if (submitted) {
    return (
      <>
        <Header /><Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F7FA" }}>
          <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center mx-4"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "#0C1E35" }}>RFQ Submitted!</h2>
            <p className="text-sm text-gray-600 mb-2">
              Your Request for Quotation has been sent to matching Sri Lankan suppliers.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              You'll receive quotes at <strong>{form.email}</strong> within 24–48 hours.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard"
                className="py-3 rounded-xl text-sm font-bold"
                style={{ background: "#E8820C", color: "white" }}>
                View in Dashboard
              </Link>
              <Link href="/products"
                className="py-3 rounded-xl text-sm font-bold border border-gray-200"
                style={{ color: "#374151" }}>
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Hero */}
        <div style={{ background: "#0C1E35" }} className="py-8">
          <div className="max-w-3xl mx-auto px-4">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Post RFQ" }]} />
            <h1 className="text-2xl font-black text-white mt-3">Post a Request for Quotation</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              Describe what you need — Sri Lankan suppliers will respond with competitive quotes.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Stepper */}
          <div className="flex items-center mb-8">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                    style={
                      step > s.num
                        ? { background: "#10B981", color: "white" }
                        : step === s.num
                          ? { background: "#E8820C", color: "white" }
                          : { background: "#E5E7EB", color: "#9CA3AF" }
                    }
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span className="text-xs mt-1 font-medium text-center hidden sm:block"
                    style={{ color: step === s.num ? "#E8820C" : "#9CA3AF" }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2"
                    style={{ background: step > s.num ? "#10B981" : "#E5E7EB" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>

            {/* Step 1: Product Info */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-black mb-6" style={{ color: "#0C1E35" }}>
                  📦 Product Information
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className={labelCls}>Product Name *</label>
                    <input type="text" required className={inputCls}
                      placeholder="e.g. Organic Ceylon Cinnamon, BOP Tea, Blue Sapphire..."
                      value={form.productName} onChange={(e) => set("productName", e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Product Category *</label>
                    <select required className={inputCls} value={form.category}
                      onChange={(e) => set("category", e.target.value)}>
                      <option value="">Select a category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.slug}>{c.emoji} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Quantity Required *</label>
                      <input type="number" min={1} required className={inputCls}
                        placeholder="e.g. 500" value={form.quantity}
                        onChange={(e) => set("quantity", e.target.value)}/>
                    </div>
                    <div>
                      <label className={labelCls}>Unit</label>
                      <select className={inputCls} value={form.unit} onChange={(e) => set("unit", e.target.value)}>
                        {["kg","g","litre","metre","pcs","cartons","bags","sets","tonnes"].map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Target Price (per unit)</label>
                      <input type="number" min={0} step="0.01" className={inputCls}
                        placeholder="e.g. 5.00" value={form.targetPrice}
                        onChange={(e) => set("targetPrice", e.target.value)}/>
                    </div>
                    <div>
                      <label className={labelCls}>Currency</label>
                      <select className={inputCls} value={form.currency}
                        onChange={(e) => set("currency", e.target.value)}>
                        {["USD","EUR","GBP","AUD","JPY","INR"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Order Frequency</label>
                    <div className="flex gap-3">
                      {[
                        { v: "one-time",   l: "One-Time" },
                        { v: "monthly",    l: "Monthly" },
                        { v: "quarterly",  l: "Quarterly" },
                        { v: "ongoing",    l: "Ongoing" },
                      ].map((o) => (
                        <button key={o.v} onClick={() => set("frequency", o.v)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold border transition-all"
                          style={form.frequency === o.v
                            ? { background: "#E8820C", color: "white", border: "1px solid #E8820C" }
                            : { border: "1px solid #E5E7EB", color: "#374151" }}>
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-black mb-6" style={{ color: "#0C1E35" }}>
                  📋 Sourcing Requirements
                </h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Destination Country *</label>
                      <input type="text" required className={inputCls}
                        placeholder="e.g. United States" value={form.destination}
                        onChange={(e) => set("destination", e.target.value)}/>
                    </div>
                    <div>
                      <label className={labelCls}>Required By Date</label>
                      <input type="date" className={inputCls} value={form.deliveryDate}
                        onChange={(e) => set("deliveryDate", e.target.value)}/>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Incoterms</label>
                    <select className={inputCls} value={form.incoterms}
                      onChange={(e) => set("incoterms", e.target.value)}>
                      {["FOB", "CIF", "EXW", "DDP", "CFR", "FCA"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Packaging Requirements</label>
                    <input type="text" className={inputCls}
                      placeholder="e.g. Retail pack 500g, bulk 25kg sacks, OEM label..."
                      value={form.packaging} onChange={(e) => set("packaging", e.target.value)}/>
                  </div>
                  <div>
                    <label className={labelCls}>Required Certifications</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {CERTIFICATIONS.map((c) => (
                        <button key={c} onClick={() => toggleCert(c)}
                          className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                          style={form.certifications.includes(c)
                            ? { background: "#E8820C", color: "white", border: "1px solid #E8820C" }
                            : { border: "1px solid #E5E7EB", color: "#374151" }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.sampleRequired}
                      onChange={(e) => set("sampleRequired", e.target.checked)}
                      className="w-4 h-4 rounded accent-orange-500"/>
                    <span className="text-sm text-gray-700">I require product samples before bulk order</span>
                  </label>
                  <div>
                    <label className={labelCls}>Additional Notes</label>
                    <textarea rows={3} className={inputCls + " resize-none"}
                      placeholder="Describe any special requirements, quality standards, or additional info for suppliers..."
                      value={form.notes} onChange={(e) => set("notes", e.target.value)}/>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-black mb-6" style={{ color: "#0C1E35" }}>
                  👤 Your Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input type="text" required className={inputCls}
                        placeholder="John Silva" value={form.fullName}
                        onChange={(e) => set("fullName", e.target.value)}/>
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input type="email" required className={inputCls}
                        placeholder="you@company.com" value={form.email}
                        onChange={(e) => set("email", e.target.value)}/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Company Name</label>
                      <input type="text" className={inputCls}
                        placeholder="Your Company Ltd." value={form.company}
                        onChange={(e) => set("company", e.target.value)}/>
                    </div>
                    <div>
                      <label className={labelCls}>Phone / WhatsApp</label>
                      <input type="tel" className={inputCls}
                        placeholder="+1 555 000 0000" value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}/>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Your Country *</label>
                    <input type="text" required className={inputCls}
                      placeholder="United States" value={form.country}
                      onChange={(e) => set("country", e.target.value)}/>
                  </div>
                  <div className="p-4 rounded-xl text-sm" style={{ background: "#FFF7ED", color: "#92400E" }}>
                    <strong>🔒 Privacy note:</strong> Your contact details are only shared with suppliers
                    who respond to your RFQ. We do not sell your data.
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-lg font-black mb-6" style={{ color: "#0C1E35" }}>
                  ✅ Review & Submit
                </h2>
                <div className="space-y-4">
                  {[
                    { title: "Product", items: [
                      { label: "Product", value: form.productName },
                      { label: "Category", value: form.category },
                      { label: "Quantity", value: `${form.quantity} ${form.unit}` },
                      { label: "Target Price", value: form.targetPrice ? `${form.targetPrice} ${form.currency}` : "Not specified" },
                    ]},
                    { title: "Requirements", items: [
                      { label: "Destination", value: form.destination },
                      { label: "Incoterms", value: form.incoterms },
                      { label: "Certifications", value: form.certifications.join(", ") || "None specified" },
                      { label: "Sample Required", value: form.sampleRequired ? "Yes" : "No" },
                    ]},
                    { title: "Contact", items: [
                      { label: "Name", value: form.fullName },
                      { label: "Email", value: form.email },
                      { label: "Company", value: form.company || "—" },
                      { label: "Country", value: form.country },
                    ]},
                  ].map((section) => (
                    <div key={section.title} className="rounded-xl overflow-hidden border border-gray-100">
                      <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-wide"
                        style={{ background: "#F9FAFB", color: "#374151" }}>
                        {section.title}
                      </div>
                      {section.items.map((item) => (
                        <div key={item.label} className="flex gap-4 px-4 py-2.5 border-t border-gray-50">
                          <span className="text-xs text-gray-500 w-28 flex-shrink-0">{item.label}</span>
                          <span className="text-xs font-medium" style={{ color: "#0C1E35" }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
                className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                style={{ color: "#374151" }}
              >
                ← Back
              </button>

              <div className="text-xs text-gray-400">Step {step} of {STEPS.length}</div>

              {step < 4 ? (
                <button
                  onClick={() => {
                    if (step === 1 && !form.productName) return;
                    setStep(step + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  {loading ? "Submitting…" : "🚀 Submit RFQ"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
