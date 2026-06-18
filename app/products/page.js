"use client";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import InquiryModal from "@/components/InquiryModal";
import Pagination from "@/components/Pagination";
import { PRODUCTS } from "@/lib/data";

const SORT_OPTIONS = [
  { value: "relevance",   label: "Relevance" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "price_asc",   label: "Price: Low → High" },
  { value: "price_desc",  label: "Price: High → Low" },
  { value: "newest",      label: "Newest First" },
];

const PER_PAGE = 8;

const DEFAULT_FILTERS = {
  categories: [], locations: [], certs: [],
  minPrice: "", maxPrice: "", rating: 0, inStock: false,
};

export default function ProductsPage() {
  const [filters, setFilters]     = useState(DEFAULT_FILTERS);
  const [sort, setSort]           = useState("relevance");
  const [page, setPage]           = useState(1);
  const [view, setView]           = useState("grid");       // "grid" | "list"
  const [inquiry, setInquiry]     = useState(null);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (filters.categories.length)
      list = list.filter((p) => filters.categories.includes(p.categorySlug));
    if (filters.locations.length)
      list = list.filter((p) => filters.locations.includes(p.location));
    if (filters.inStock)
      list = list.filter((p) => p.inStock);
    if (filters.rating)
      list = list.filter((p) => p.rating >= filters.rating);
    if (filters.minPrice)
      list = list.filter((p) => p.priceMin >= parseFloat(filters.minPrice));
    if (filters.maxPrice)
      list = list.filter((p) => p.priceMax <= parseFloat(filters.maxPrice));
    if (filters.certs.length)
      list = list.filter((p) =>
        filters.certs.every((c) => p.certifications.includes(c))
      );

    if (sort === "rating_desc")  list.sort((a, b) => b.rating - a.rating);
    if (sort === "price_asc")    list.sort((a, b) => a.priceMin - b.priceMin);
    if (sort === "price_desc")   list.sort((a, b) => b.priceMax - a.priceMax);
    if (sort === "newest")       list.sort((a, b) => b.id - a.id);

    return list;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleFilterChange(f) { setFilters(f); setPage(1); }
  function handleReset()        { setFilters(DEFAULT_FILTERS); setPage(1); }

  const activeFilterCount =
    filters.categories.length + filters.locations.length + filters.certs.length +
    (filters.inStock ? 1 : 0) + (filters.rating ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0);

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Hero bar */}
        <div style={{ background: "#0C1E35" }} className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Products" },
            ]} />
            <h1 className="text-2xl font-black text-white mt-3">
              Browse Sri Lanka Exports
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              {PRODUCTS.length.toLocaleString()} products from verified Sri Lankan suppliers
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-2xl px-4 py-3"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-bold" style={{ color: "#0C1E35" }}>
                    {filtered.length}
                  </span>{" "}
                  products found
                  {activeFilterCount > 0 && (
                    <span
                      className="ml-2 text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "#FFF7ED", color: "#E8820C" }}
                    >
                      {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                    className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    style={{ color: "#374151" }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>

                  {/* View toggle */}
                  <div className="flex gap-1 border border-gray-200 rounded-xl p-1">
                    {["grid", "list"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setView(v)}
                        className="p-1.5 rounded-lg transition-all"
                        style={view === v ? { background: "#E8820C", color: "white" } : { color: "#6B7280" }}
                      >
                        {v === "grid" ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products grid */}
              {paged.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>No products found</h3>
                  <p className="text-sm text-gray-500 mb-4">Try adjusting your filters</p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-xl text-sm font-bold"
                    style={{ background: "#E8820C", color: "white" }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paged.map((p) => (
                    <ProductCard key={p.id} product={p} onInquire={setInquiry} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {paged.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl flex gap-4 p-4 border border-gray-100 hover:-translate-y-0.5 transition-transform"
                      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    >
                      <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${p.bg} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-4xl">{p.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium mb-0.5" style={{ color: "#E8820C" }}>{p.category}</p>
                        <h3 className="font-bold text-sm" style={{ color: "#0C1E35" }}>{p.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{p.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-base font-black" style={{ color: "#E8820C" }}>{p.price}<span className="text-xs font-normal text-gray-500">{p.unit}</span></span>
                          <span className="text-xs text-gray-500">{p.minOrder}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => setInquiry(p)}
                          className="px-4 py-2 rounded-xl text-xs font-bold"
                          style={{ background: "#E8820C", color: "white" }}
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Pagination current={page} total={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {inquiry && <InquiryModal product={inquiry} onClose={() => setInquiry(null)} />}
    </>
  );
}
