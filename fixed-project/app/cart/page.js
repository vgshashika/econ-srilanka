"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { PRODUCTS } from "@/lib/data";

// ─── Mock: pre-fill basket with 3 products (replace with localStorage/context) ─
const INIT_BASKET = [
  { ...PRODUCTS[0], qty: 100, unit: "kg",    note: "" },
  { ...PRODUCTS[1], qty: 5,   unit: "carat", note: "" },
  { ...PRODUCTS[3], qty: 50,  unit: "kg",    note: "" },
];

const STATUS_COLORS = {
  "Top Supplier": { bg: "#FFF3E0", color: "#E8820C" },
  "Verified":     { bg: "#E3F2FD", color: "#1565C0" },
};

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
    </svg>
  );
}

export default function CartPage() {
  const [items,   setItems]   = useState(INIT_BASKET);
  const [step,    setStep]    = useState("basket");   // "basket" | "inquiry" | "sent"
  const [loading, setLoading] = useState(false);
  const [form,    setForm]    = useState({
    name: "", company: "", email: "", phone: "",
    country: "Sri Lanka", message: "",
  });
  const [errors, setErrors] = useState({});

  /* ── helpers ── */
  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function updateQty(id, val) {
    const n = parseInt(val, 10);
    if (isNaN(n) || n < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: n } : i));
  }

  function updateNote(id, val) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, note: val } : i));
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.phone.trim())   e.phone   = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: await submitInquiry({ items, contact: form });
      await new Promise(r => setTimeout(r, 1200));
      setStep("sent");
    } catch {
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Empty basket ── */
  if (items.length === 0 && step === "basket") {
    return (
      <>
        <Header />
        <Navbar />
        <div style={{ background: "#F5F7FA", minHeight: "70vh" }}
          className="flex items-center justify-center">
          <div className="text-center py-16">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your Inquiry Basket is Empty</h2>
            <p className="text-gray-500 mb-6">
              Browse products and click "Add to Basket" to collect inquiries.
            </p>
            <Link href="/products"
              className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: "#E8820C" }}>
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Success screen ── */
  if (step === "sent") {
    return (
      <>
        <Header />
        <Navbar />
        <div style={{ background: "#F5F7FA", minHeight: "70vh" }}
          className="flex items-center justify-center">
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "#DCFCE7" }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                viewBox="0 0 24 24" stroke="#16A34A" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Inquiry Sent!</h2>
            <p className="text-gray-500 mb-2">
              Your inquiry for <strong>{items.length} product{items.length > 1 ? "s" : ""}</strong> has
              been submitted to the suppliers.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              You will receive responses to <strong>{form.email}</strong> within 24–48 hours.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard"
                className="px-5 py-2.5 rounded-xl text-white font-bold text-sm"
                style={{ background: "#E8820C" }}>
                Track in Dashboard
              </Link>
              <Link href="/products"
                className="px-5 py-2.5 rounded-xl font-bold text-sm border-2"
                style={{ borderColor: "#E8820C", color: "#E8820C" }}>
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

      <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
        {/* Page header bar */}
        <div style={{ background: "#0C1E35" }} className="py-5">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Inquiry Basket" },
            ]} />
            <h1 className="text-xl font-black text-white mt-2">
              Inquiry Basket
              <span className="ml-2 text-sm font-normal"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                ({items.length} product{items.length > 1 ? "s" : ""})
              </span>
            </h1>
          </div>
        </div>

        {/* Step indicator */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
            {["basket","inquiry"].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-300 mx-1">›</span>}
                <span className={`flex items-center gap-1.5 font-medium ${
                  step === s ? "text-[#E8820C]" : "text-gray-400"}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                    step === s ? "bg-[#E8820C] text-white" : "bg-gray-200 text-gray-500"}`}>
                    {i + 1}
                  </span>
                  {s === "basket" ? "Review Items" : "Contact Details"}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* ══ STEP 1: Basket ══ */}
          {step === "basket" && (
            <div className="flex gap-6 items-start">

              {/* Items list */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>

                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="font-bold text-gray-800">
                      {items.length} Product{items.length > 1 ? "s" : ""} in Basket
                    </span>
                    <button onClick={() => setItems([])}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors">
                      Clear All
                    </button>
                  </div>

                  {/* Product rows */}
                  {items.map((item, idx) => (
                    <div key={item.id}
                      className={`flex gap-4 p-5 ${
                        idx < items.length - 1 ? "border-b border-gray-100" : ""}`}>

                      {/* Emoji thumbnail */}
                      <div className={`bg-gradient-to-br ${item.bg} w-20 h-20 rounded-xl
                                        flex items-center justify-center text-4xl flex-shrink-0`}>
                        {item.emoji}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link href={`/products/${item.id}`}
                              className="font-semibold text-[13px] text-gray-800 hover:text-[#E8820C]
                                         transition-colors line-clamp-2 leading-snug">
                              {item.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold"
                                style={{ color: "#E8820C" }}>
                                {item.price}{item.unit}
                              </span>
                              <span className="text-xs text-gray-400">·</span>
                              <span className="text-xs text-gray-500">{item.minOrder}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                style={{
                                  background: STATUS_COLORS[item.badge]?.bg || "#F3F4F6",
                                  color: STATUS_COLORS[item.badge]?.color || "#6B7280",
                                }}>
                                {item.badge}
                              </span>
                              <span className="text-[11px] text-gray-600">{item.supplier}</span>
                              <span className="text-gray-300">·</span>
                              <span className="text-[11px] text-gray-400">📍 {item.location}</span>
                            </div>
                          </div>
                          <button onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1">
                            <TrashIcon />
                          </button>
                        </div>

                        {/* Quantity + note */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <label className="text-[11px] text-gray-500 font-medium">Qty:</label>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500
                                           hover:bg-gray-100 transition-colors font-bold text-sm">
                                –
                              </button>
                              <input
                                type="number" min="1" value={item.qty}
                                onChange={e => updateQty(item.id, e.target.value)}
                                className="w-14 text-center text-sm font-semibold border-x border-gray-200
                                           py-1 focus:outline-none"/>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500
                                           hover:bg-gray-100 transition-colors font-bold text-sm">
                                +
                              </button>
                            </div>
                            <span className="text-[11px] text-gray-400">{item.unit}</span>
                          </div>
                        </div>

                        {/* Note */}
                        <textarea
                          value={item.note}
                          onChange={e => updateNote(item.id, e.target.value)}
                          placeholder="Add a note for this supplier (e.g. packaging, certification needs)..."
                          rows={2}
                          className="mt-2 w-full text-[12px] text-gray-700 border border-gray-200
                                     rounded-lg px-3 py-2 resize-none focus:outline-none
                                     focus:border-orange-300 placeholder-gray-300"/>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add more */}
                <div className="mt-4 text-center">
                  <Link href="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: "#E8820C" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add More Products
                  </Link>
                </div>
              </div>

              {/* Summary panel */}
              <div className="w-72 flex-shrink-0">
                <div className="bg-white rounded-2xl p-5 sticky top-4"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <h3 className="font-bold text-gray-800 mb-4">Inquiry Summary</h3>

                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-start mb-3">
                      <div className="flex gap-2 min-w-0">
                        <span className="text-lg flex-shrink-0">{item.emoji}</span>
                        <span className="text-[11px] text-gray-600 leading-tight truncate">
                          {item.name.split(" ").slice(0, 4).join(" ")}...
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-800 flex-shrink-0 ml-2">
                        {item.qty} {item.unit}
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-gray-100 mt-4 pt-4 mb-5">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Products</span>
                      <span className="font-semibold">{items.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Suppliers</span>
                      <span className="font-semibold">
                        {new Set(items.map(i => i.supplier)).size}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Response time</span>
                      <span className="font-semibold text-green-600">24–48 hrs</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("inquiry")}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm
                               transition-all hover:opacity-90"
                    style={{ background: "#E8820C" }}>
                    Proceed to Inquiry →
                  </button>

                  <p className="text-[10px] text-gray-400 text-center mt-3 leading-relaxed">
                    🔒 Your details are shared only with selected suppliers
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══ STEP 2: Contact Details ══ */}
          {step === "inquiry" && (
            <div className="flex gap-6 items-start">

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1">
                <div className="bg-white rounded-2xl p-6"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <h2 className="font-bold text-gray-800 mb-1">Your Contact Details</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Suppliers will respond to these details within 24–48 hours.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input value={form.name} onChange={e => setF("name", e.target.value)}
                        placeholder="John Smith"
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none
                                    focus:border-orange-400 ${errors.name ? "border-red-400" : "border-gray-200"}`}/>
                      {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input value={form.company} onChange={e => setF("company", e.target.value)}
                        placeholder="Your Company Ltd"
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none
                                    focus:border-orange-400 ${errors.company ? "border-red-400" : "border-gray-200"}`}/>
                      {errors.company && <p className="text-red-500 text-[10px] mt-1">{errors.company}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input type="email" value={form.email} onChange={e => setF("email", e.target.value)}
                        placeholder="john@company.com"
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none
                                    focus:border-orange-400 ${errors.email ? "border-red-400" : "border-gray-200"}`}/>
                      {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input value={form.phone} onChange={e => setF("phone", e.target.value)}
                        placeholder="+1 234 567 8900"
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none
                                    focus:border-orange-400 ${errors.phone ? "border-red-400" : "border-gray-200"}`}/>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                        Country
                      </label>
                      <select value={form.country} onChange={e => setF("country", e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                                   focus:outline-none focus:border-orange-400">
                        {["Sri Lanka","United States","United Kingdom","Germany","Australia",
                          "Canada","Singapore","UAE","India","Japan","China","Other"].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-semibold text-gray-700 mb-1">
                      Additional Message
                    </label>
                    <textarea value={form.message} onChange={e => setF("message", e.target.value)}
                      rows={4} placeholder="Any special requirements, certifications needed, target price range..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm
                                 resize-none focus:outline-none focus:border-orange-400"/>
                  </div>

                  {/* Products being inquired */}
                  <div className="mt-5 p-4 rounded-xl" style={{ background: "#FFF3E0" }}>
                    <div className="text-[11px] font-bold mb-2" style={{ color: "#E8820C" }}>
                      📦 Inquiring about {items.length} product{items.length > 1 ? "s" : ""}:
                    </div>
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-2 mb-1">
                        <span className="text-base">{item.emoji}</span>
                        <span className="text-[11px] text-gray-700 flex-1 truncate">{item.name}</span>
                        <span className="text-[11px] font-semibold" style={{ color: "#E8820C" }}>
                          {item.qty} {item.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep("basket")}
                      className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-sm
                                 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold
                                 transition-all hover:opacity-90 disabled:opacity-60
                                 flex items-center justify-center gap-2"
                      style={{ background: "#E8820C" }}>
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 20"/>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Inquiry to Suppliers 🚀"
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Sidebar summary */}
              <div className="w-72 flex-shrink-0">
                <div className="bg-white rounded-2xl p-5 sticky top-4"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <h3 className="font-bold text-gray-800 mb-4">What Happens Next?</h3>
                  {[
                    { n: "1", title: "Inquiry Sent",        sub: "Your inquiry reaches all selected suppliers instantly." },
                    { n: "2", title: "Supplier Responds",   sub: "Suppliers reply with quotes within 24–48 hours." },
                    { n: "3", title: "Compare & Negotiate", sub: "Review all quotes in your dashboard and negotiate." },
                    { n: "4", title: "Place Order",         sub: "Finalise the deal and arrange payment via Trade Assurance." },
                  ].map(({ n, title, sub }) => (
                    <div key={n} className="flex gap-3 mb-4 last:mb-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center
                                      text-white text-xs font-black flex-shrink-0 mt-0.5"
                        style={{ background: "#E8820C" }}>
                        {n}
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-gray-800">{title}</div>
                        <div className="text-[11px] text-gray-500 leading-relaxed">{sub}</div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-5 p-3 rounded-xl text-center"
                    style={{ background: "#F0FDF4" }}>
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-[11px] font-bold text-green-700">Trade Assurance Protected</div>
                    <div className="text-[10px] text-green-600 mt-0.5">
                      Your payment is secure until you approve the order.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
