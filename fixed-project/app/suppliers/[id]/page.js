"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import InquiryModal from "@/components/InquiryModal";
import { SUPPLIERS, PRODUCTS } from "@/lib/data";

const TABS = ["Products", "About", "Certifications", "Reviews"];

const MOCK_REVIEWS = [
  { name: "Carlos Mendez", country: "🇲🇽 Mexico", rating: 5, date: "Apr 2025", text: "Exceptional supplier. Products always match the samples and documentation is in perfect order for customs." },
  { name: "Li Wei", country: "🇨🇳 China", rating: 5, date: "Mar 2025", text: "Reliable partner for 3 years. Consistent quality and fair pricing. Gold supplier status is well deserved." },
  { name: "Sarah O'Brien", country: "🇮🇪 Ireland", rating: 4, date: "Feb 2025", text: "Great products, good communication. Would appreciate faster sample delivery in future orders." },
];

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill={s <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

export default function SupplierProfilePage() {
  const { id } = useParams();
  const [tab, setTab]         = useState(0);
  const [inquiry, setInquiry] = useState(null);

  const supplier = SUPPLIERS.find((s) => s.id === parseInt(id)) || SUPPLIERS[0];
  const products = PRODUCTS.filter((p) => p.supplierId === supplier.id);

  const isGold = supplier.badge === "Gold Supplier";

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Suppliers", href: "/suppliers" },
              { label: supplier.name },
            ]} />
          </div>
        </div>

        {/* Profile banner */}
        <div style={{ background: "#0C1E35" }} className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Logo */}
              <div
                className={`w-24 h-24 rounded-2xl ${supplier.bg} flex items-center justify-center text-5xl flex-shrink-0 border-4`}
                style={{ borderColor: isGold ? "#F59E0B" : "rgba(255,255,255,0.2)" }}
              >
                {supplier.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-black text-white">{supplier.name}</h1>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={isGold ? { background: "#F59E0B", color: "white" } : { background: "rgba(255,255,255,0.15)", color: "white" }}
                  >
                    {isGold ? "🥇" : "✅"} {supplier.badge}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {supplier.category} · 📍 {supplier.location}, Sri Lanka · Est. {supplier.established}
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "Rating", value: supplier.rating + " ⭐" },
                    { label: "Reviews", value: supplier.reviews },
                    { label: "Response Time", value: supplier.responseTime },
                    { label: "Products", value: supplier.productCount + "+" },
                    { label: "Export Countries", value: supplier.exportCountries + "+" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-white font-bold text-lg">{s.value}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <button
                  onClick={() => setInquiry({ name: `Inquiry to ${supplier.name}`, emoji: supplier.emoji, supplier: supplier.name, supplierId: supplier.id, price: "—", unit: "", minOrder: "—", minOrderQty: 1, moqUnit: "units" })}
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  💬 Contact Supplier
                </button>
                <a
                  href={`mailto:supplier@ecgemlanka.lk`}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-center border transition-all hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "white" }}
                >
                  ✉️ Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="flex border-b border-gray-100">
                  {TABS.map((t, i) => (
                    <button
                      key={t}
                      onClick={() => setTab(i)}
                      className="flex-1 text-sm font-semibold py-4 transition-all border-b-2"
                      style={tab === i
                        ? { borderColor: "#E8820C", color: "#E8820C" }
                        : { borderColor: "transparent", color: "#6B7280" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {/* Products tab */}
                  {tab === 0 && (
                    products.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">No products listed yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((p) => (
                          <ProductCard key={p.id} product={p} onInquire={setInquiry} />
                        ))}
                      </div>
                    )
                  )}

                  {/* About tab */}
                  {tab === 1 && (
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-6">{supplier.description}</p>
                      <h4 className="text-sm font-bold mb-3" style={{ color: "#0C1E35" }}>Main Product Range</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {supplier.mainProducts.map((p) => (
                          <span key={p} className="text-xs px-3 py-1.5 rounded-full font-medium"
                            style={{ background: "#F0F9FF", color: "#0C1E35", border: "1px solid #BAE6FD" }}>
                            {p}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Annual Revenue",      value: supplier.annualRevenue },
                          { label: "Employees",           value: supplier.employees },
                          { label: "Export Countries",    value: supplier.exportCountries + "+" },
                          { label: "Year Established",    value: supplier.established },
                          { label: "Response Rate",       value: supplier.responseRate },
                          { label: "Avg. Response Time",  value: supplier.responseTime },
                        ].map((f) => (
                          <div key={f.label} className="p-3 rounded-xl" style={{ background: "#F9FAFB" }}>
                            <div className="text-xs text-gray-500 mb-0.5">{f.label}</div>
                            <div className="font-bold text-sm" style={{ color: "#0C1E35" }}>{f.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications tab */}
                  {tab === 2 && (
                    <div className="space-y-3">
                      {supplier.certifications.map((cert) => (
                        <div key={cert} className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: "#E5E7EB" }}>
                          <span className="text-2xl">🏅</span>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: "#0C1E35" }}>{cert}</p>
                            <p className="text-xs text-gray-500">Verified certification · Active</p>
                          </div>
                          <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: "#F0FDF4", color: "#16A34A" }}>
                            ✓ Valid
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reviews tab */}
                  {tab === 3 && (
                    <div className="space-y-4">
                      {/* Rating summary */}
                      <div className="flex items-center gap-6 p-4 rounded-xl mb-4" style={{ background: "#F9FAFB" }}>
                        <div className="text-center">
                          <div className="text-5xl font-black" style={{ color: "#0C1E35" }}>{supplier.rating}</div>
                          <Stars rating={supplier.rating} />
                          <p className="text-xs text-gray-500 mt-1">{supplier.reviews} reviews</p>
                        </div>
                        <div className="flex-1">
                          {[5,4,3,2,1].map((s) => {
                            const pct = s === 5 ? 78 : s === 4 ? 15 : s === 3 ? 5 : 2;
                            return (
                              <div key={s} className="flex items-center gap-2 mb-1">
                                <span className="text-xs w-3 text-gray-500">{s}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#F59E0B" }}/>
                                </div>
                                <span className="text-xs text-gray-400 w-7">{pct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {MOCK_REVIEWS.map((r, i) => (
                        <div key={i} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                            style={{ background: "#0C1E35" }}>
                            {r.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold" style={{ color: "#0C1E35" }}>{r.name}</span>
                              <span className="text-xs text-gray-400">{r.country} · {r.date}</span>
                            </div>
                            <Stars rating={r.rating} />
                            <p className="text-sm text-gray-600 mt-1">{r.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact card */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h4 className="font-bold text-sm mb-4" style={{ color: "#0C1E35" }}>Contact Supplier</h4>
                <div className="space-y-3 text-xs mb-4">
                  {[
                    { icon: "⏱️", label: "Response Time", value: supplier.responseTime },
                    { icon: "📈", label: "Response Rate", value: supplier.responseRate },
                    { icon: "📦", label: "Products Listed", value: supplier.productCount + "+" },
                    { icon: "🌍", label: "Export Markets", value: supplier.exportCountries + " countries" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <span className="text-base">{row.icon}</span>
                      <span className="text-gray-500 flex-1">{row.label}</span>
                      <span className="font-semibold" style={{ color: "#0C1E35" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setInquiry({ name: `Inquiry to ${supplier.name}`, emoji: supplier.emoji, supplier: supplier.name, supplierId: supplier.id, price: "—", unit: "", minOrder: "—", minOrderQty: 1, moqUnit: "units" })}
                  className="w-full py-3 rounded-xl text-sm font-bold"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  💬 Send Message
                </button>
              </div>

              {/* Trade assurance */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h4 className="font-bold text-sm mb-3" style={{ color: "#0C1E35" }}>🛡️ Verified Supplier</h4>
                {[
                  "Business licence verified",
                  "Export permit active",
                  "On-site audit completed",
                  "Product samples verified",
                  "Certifications checked",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span className="text-green-500">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {inquiry && <InquiryModal product={inquiry} onClose={() => setInquiry(null)} />}
    </>
  );
}
