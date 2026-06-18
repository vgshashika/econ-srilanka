"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import SupplierCard from "@/components/SupplierCard";
import InquiryModal from "@/components/InquiryModal";
import Pagination from "@/components/Pagination";
import { PRODUCTS, SUPPLIERS } from "@/lib/data";

const PER_PAGE = 8;

export default function SearchPage() {
  const searchParams    = useSearchParams();
  const q               = searchParams.get("q") || "";
  const [tab, setTab]   = useState("products");   // "products" | "suppliers"
  const [page, setPage] = useState(1);
  const [inquiry, setInquiry] = useState(null);

  const qLow = q.toLowerCase();

  const matchedProducts = useMemo(() =>
    PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(qLow) ||
        p.description.toLowerCase().includes(qLow) ||
        p.category.toLowerCase().includes(qLow) ||
        p.supplier.toLowerCase().includes(qLow)
    ),
    [qLow]
  );

  const matchedSuppliers = useMemo(() =>
    SUPPLIERS.filter(
      (s) =>
        s.name.toLowerCase().includes(qLow) ||
        s.description.toLowerCase().includes(qLow) ||
        s.category.toLowerCase().includes(qLow) ||
        s.mainProducts.some((mp) => mp.toLowerCase().includes(qLow))
    ),
    [qLow]
  );

  const productPages  = Math.ceil(matchedProducts.length / PER_PAGE);
  const supplierPages = Math.ceil(matchedSuppliers.length / PER_PAGE);

  const pagedProducts  = matchedProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const pagedSuppliers = matchedSuppliers.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function switchTab(t) { setTab(t); setPage(1); }

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Header bar */}
        <div style={{ background: "#0C1E35" }} className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Search Results" }]} />
            <h1 className="text-2xl font-black text-white mt-3">
              {q ? (
                <>Search results for <span style={{ color: "#E8820C" }}>"{q}"</span></>
              ) : (
                "Search Sri Lanka Exports"
              )}
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              {matchedProducts.length} products · {matchedSuppliers.length} suppliers
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tab switcher */}
          <div
            className="flex gap-1 p-1 mb-6 rounded-2xl w-fit"
            style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            {[
              { key: "products",  label: "🛍️ Products",  count: matchedProducts.length },
              { key: "suppliers", label: "🏢 Suppliers", count: matchedSuppliers.length },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => switchTab(t.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={
                  tab === t.key
                    ? { background: "#E8820C", color: "white" }
                    : { color: "#6B7280" }
                }
              >
                {t.label}
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={
                    tab === t.key
                      ? { background: "rgba(255,255,255,0.25)", color: "white" }
                      : { background: "#F3F4F6", color: "#374151" }
                  }
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Empty state */}
          {!q && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#0C1E35" }}>
                Start your search
              </h3>
              <p className="text-sm text-gray-500">
                Try searching for "Ceylon tea", "blue sapphire", or "coconut oil"
              </p>
            </div>
          )}

          {/* Products results */}
          {q && tab === "products" && (
            matchedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>
                  No products found for "{q}"
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Try different keywords or browse our categories below
                </p>
                <a
                  href="/products"
                  className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  Browse All Products
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {pagedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} onInquire={setInquiry} />
                  ))}
                </div>
                <Pagination
                  current={page}
                  total={productPages}
                  onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                />
              </>
            )
          )}

          {/* Suppliers results */}
          {q && tab === "suppliers" && (
            matchedSuppliers.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>
                  No suppliers found for "{q}"
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Try different keywords or browse all suppliers
                </p>
                <a
                  href="/suppliers"
                  className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: "#E8820C", color: "white" }}
                >
                  Browse All Suppliers
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {pagedSuppliers.map((s) => (
                    <SupplierCard key={s.id} supplier={s} />
                  ))}
                </div>
                <Pagination
                  current={page}
                  total={supplierPages}
                  onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                />
              </>
            )
          )}
        </div>
      </div>

      <Footer />
      {inquiry && <InquiryModal product={inquiry} onClose={() => setInquiry(null)} />}
    </>
  );
}
