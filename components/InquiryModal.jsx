"use client";
import { useState, useEffect } from "react";

export default function InquiryModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    quantity: product?.minOrderQty || "", unit: product?.moqUnit || "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      quantity: product?.minOrderQty || "",
      unit: product?.moqUnit || "",
      message: "",
    });
    setSent(false);
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real API call: await submitInquiry({ ...form, product_id: product.id })
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10"
        >
          <h2 className="text-base font-bold" style={{ color: "#0C1E35" }}>
            💬 Send Inquiry
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>Inquiry Sent!</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your inquiry has been sent to <strong>{product?.supplier}</strong>.
              They typically respond within {product?.responseTime || "24 hours"}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: "#E8820C", color: "white" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Product info */}
            {product && (
              <div
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "#FFF7ED" }}
              >
                <span className="text-2xl">{product.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: "#0C1E35" }}>
                    {product.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#E8820C" }}>
                    {product.price} {product.unit} · {product.minOrder}
                  </p>
                </div>
              </div>
            )}

            {/* Fields */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Your Name *", key: "name",    type: "text",  placeholder: "John Silva",          required: true },
                { label: "Email *",     key: "email",   type: "email", placeholder: "john@company.com",    required: true },
                { label: "Company",     key: "company", type: "text",  placeholder: "Your Company Ltd.",   required: false },
                { label: "Phone",       key: "phone",   type: "tel",   placeholder: "+1 555 000 0000",     required: false },
              ].map((f) => (
                <div key={f.key} className={f.key === "name" || f.key === "email" ? "" : ""}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={form[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>
                  Quantity Required *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={form.quantity}
                  onChange={(e) => set("quantity", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>Unit</label>
                <input
                  type="text"
                  value={form.unit}
                  onChange={(e) => set("unit", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>
                Message / Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Describe your requirements, target price, delivery destination, certifications needed..."
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-150 hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: "#E8820C", color: "white" }}
            >
              {loading ? "Sending…" : "Send Inquiry to Supplier"}
            </button>

            <p className="text-xs text-center text-gray-400">
              Your contact details are only shared with this supplier.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
