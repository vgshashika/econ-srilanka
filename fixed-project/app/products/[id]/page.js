"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryModal from "@/components/InquiryModal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, SUPPLIERS } from "@/lib/data";

const TABS = ["Description", "Specifications", "Supplier Info", "Reviews"];

const MOCK_REVIEWS = [
  { name: "Ahmed Al-Rashid", country: "🇦🇪 UAE", rating: 5, date: "Mar 2025", text: "Excellent quality and packaging. Supplier was very responsive and the product matched the samples exactly." },
  { name: "Priya Sharma", country: "🇮🇳 India", rating: 5, date: "Feb 2025", text: "Third order with this supplier. Consistent quality. Certifications are genuine. Highly recommend." },
  { name: "Thomas Weber", country: "🇩🇪 Germany", rating: 4, date: "Jan 2025", text: "Good product, slight delay in shipping but the supplier communicated proactively. Overall satisfied." },
];

function Stars({ rating, size = "sm" }) {
  const w = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={w} viewBox="0 0 20 20" fill={s <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [tab, setTab]         = useState(0);
  const [imgIdx, setImgIdx]   = useState(0);
  const [inquiry, setInquiry] = useState(false);
  const [qty, setQty]         = useState("");

  const product  = PRODUCTS.find((p) => p.id === parseInt(id)) || PRODUCTS[0];
  const supplier = SUPPLIERS.find((s) => s.id === product.supplierId);
  const related  = PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  useEffect(() => { setQty(product.minOrderQty); }, [product]);

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Breadcrumb bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.category, href: `/categories/${product.categorySlug}` },
              { label: product.name },
            ]} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Images + main info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image card */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className={`relative h-64 bg-gradient-to-br ${product.bg} flex items-center justify-center`}>
                  <span className="text-[6rem] select-none">{product.images[imgIdx]}</span>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-sm font-bold bg-red-500 text-white px-4 py-2 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3 p-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-14 h-14 rounded-xl text-2xl flex items-center justify-center transition-all ${
                        imgIdx === i ? "ring-2 scale-105" : "opacity-60 hover:opacity-100"
                      }`}
                      style={imgIdx === i ? { ringColor: "#E8820C", background: "#FFF7ED" } : { background: "#F9FAFB" }}
                    >
                      {img}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
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
                  {tab === 0 && (
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-4">{product.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Lead Time", value: product.leadTime, icon: "⏱️" },
                          { label: "Payment Terms", value: product.paymentTerms, icon: "💳" },
                          { label: "Packaging", value: product.packaging, icon: "📦" },
                          { label: "Min. Order", value: product.minOrder, icon: "📋" },
                        ].map((info) => (
                          <div key={info.label} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "#F9FAFB" }}>
                            <span className="text-lg">{info.icon}</span>
                            <div>
                              <p className="text-xs text-gray-500">{info.label}</p>
                              <p className="text-sm font-semibold" style={{ color: "#0C1E35" }}>{info.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 1 && (
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([k, v]) => (
                        <div key={k} className="flex gap-4 py-2.5 border-b border-gray-50 last:border-0">
                          <span className="text-sm font-medium w-40 flex-shrink-0" style={{ color: "#374151" }}>{k}</span>
                          <span className="text-sm text-gray-600">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {tab === 2 && supplier && (
                    <div>
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-16 h-16 rounded-2xl ${supplier.bg} flex items-center justify-center text-3xl flex-shrink-0`}>
                          {supplier.emoji}
                        </div>
                        <div>
                          <h4 className="font-bold" style={{ color: "#0C1E35" }}>{supplier.name}</h4>
                          <p className="text-xs text-gray-500">{supplier.category} · {supplier.location}, Sri Lanka</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Stars rating={supplier.rating} />
                            <span className="text-xs font-semibold">{supplier.rating}</span>
                            <span className="text-xs text-gray-400">({supplier.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">{supplier.description}</p>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                          { label: "Est.", value: supplier.established },
                          { label: "Employees", value: supplier.employees },
                          { label: "Export Countries", value: supplier.exportCountries + "+" },
                        ].map((s) => (
                          <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "#F9FAFB" }}>
                            <div className="font-black text-base" style={{ color: "#0C1E35" }}>{s.value}</div>
                            <div className="text-xs text-gray-500">{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/suppliers/${supplier.id}`}
                        className="inline-block px-5 py-2 rounded-xl text-sm font-bold"
                        style={{ background: "#0C1E35", color: "white" }}
                      >
                        View Full Profile →
                      </Link>
                    </div>
                  )}

                  {tab === 3 && (
                    <div className="space-y-4">
                      {MOCK_REVIEWS.map((r, i) => (
                        <div key={i} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                            style={{ background: "#0C1E35" }}
                          >
                            {r.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold" style={{ color: "#0C1E35" }}>{r.name}</span>
                              <span className="text-xs text-gray-400">{r.country}</span>
                              <span className="text-xs text-gray-400">· {r.date}</span>
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

            {/* RIGHT: Price & Inquiry */}
            <div className="space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black" style={{ color: "#E8820C" }}>{product.price}</span>
                  <span className="text-sm text-gray-500">{product.unit}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">MOQ: {product.minOrder}</p>

                {/* Certifications */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.certifications.map((c) => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}>
                      ✅ {c}
                    </span>
                  ))}
                </div>

                {/* Qty input */}
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
                  Quantity
                </label>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    min={product.minOrderQty}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <span className="text-sm text-gray-500 font-medium">{product.moqUnit}</span>
                </div>

                <button
                  onClick={() => setInquiry(true)}
                  className="w-full py-3.5 rounded-xl text-sm font-bold mb-3 transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  💬 Send Inquiry
                </button>

                <Link
                  href="/rfq"
                  className="block text-center w-full py-3 rounded-xl text-sm font-bold border transition-all hover:bg-gray-50"
                  style={{ border: "1.5px solid #0C1E35", color: "#0C1E35" }}
                >
                  📋 Post an RFQ
                </Link>
              </div>

              {/* Supplier card */}
              {supplier && (
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl ${supplier.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {supplier.emoji}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#0C1E35" }}>{supplier.name}</p>
                      <p className="text-xs text-gray-500">{supplier.location} · Est. {supplier.established}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "Response Time", value: supplier.responseTime },
                      { label: "Response Rate", value: supplier.responseRate },
                    ].map((s) => (
                      <div key={s.label} className="p-2 rounded-lg" style={{ background: "#F9FAFB" }}>
                        <div className="text-gray-500">{s.label}</div>
                        <div className="font-bold" style={{ color: "#0C1E35" }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trade assurance */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h4 className="text-sm font-bold mb-3" style={{ color: "#0C1E35" }}>🛡️ Trade Assurance</h4>
                {[
                  "Verified supplier credentials",
                  "Sample order supported",
                  "Secure payment channels",
                  "Quality inspection available",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span className="text-green-500">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-black mb-5" style={{ color: "#0C1E35" }}>
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} onInquire={setInquiry} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      {inquiry && <InquiryModal product={product} onClose={() => setInquiry(false)} />}
    </>
  );
}
