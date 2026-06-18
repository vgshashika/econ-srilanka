"use client";
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SupplierCard from "@/components/SupplierCard";
import Pagination from "@/components/Pagination";
import { SUPPLIERS, CATEGORIES, LOCATIONS } from "@/lib/data";

const SORT_OPTIONS = [
  { value: "default",      label: "Best Match" },
  { value: "rating_desc",  label: "Highest Rated" },
  { value: "reviews_desc", label: "Most Reviewed" },
  { value: "response",     label: "Fastest Response" },
];

const PER_PAGE = 6;

export default function SuppliersPage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [badge, setBadge]       = useState("");
  const [sort, setSort]         = useState("default");
  const [page, setPage]         = useState(1);

  const filtered = useMemo(() => {
    let list = [...SUPPLIERS];
    if (search)   list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter((s) => s.categorySlug === category);
    if (location) list = list.filter((s) => s.location === location);
    if (badge)    list = list.filter((s) => s.badge === badge);

    if (sort === "rating_desc")  list.sort((a, b) => b.rating - a.rating);
    if (sort === "reviews_desc") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [search, category, location, badge, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Hero */}
        <div style={{ background: "#0C1E35" }} className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Suppliers" }]} />
            <h1 className="text-2xl font-black text-white mt-3 mb-1">
              Find Sri Lankan Suppliers
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {SUPPLIERS.length.toLocaleString()} verified exporters across all categories
            </p>

            {/* Search bar */}
            <div className="mt-5 flex gap-3">
              <div className="relative flex-1 max-w-xl">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search suppliers by name or product..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filter bar */}
          <div
            className="flex flex-wrap items-center gap-3 mb-6 bg-white rounded-2xl px-4 py-3"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            {/* Category */}
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              style={{ color: "#374151" }}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>{c.emoji} {c.name}</option>
              ))}
            </select>

            {/* Location */}
            <select
              value={location}
              onChange={(e) => { setLocation(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              style={{ color: "#374151" }}
            >
              <option value="">All Locations</option>
              {LOCATIONS.map((l) => <option key={l} value={l}>📍 {l}</option>)}
            </select>

            {/* Badge */}
            <select
              value={badge}
              onChange={(e) => { setBadge(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              style={{ color: "#374151" }}
            >
              <option value="">All Suppliers</option>
              <option value="Gold Supplier">🥇 Gold Supplier</option>
              <option value="Verified Supplier">✅ Verified Supplier</option>
            </select>

            <div className="flex-1"/>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              style={{ color: "#374151" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <span className="text-sm text-gray-500">
              <span className="font-bold" style={{ color: "#0C1E35" }}>{filtered.length}</span> suppliers
            </span>
          </div>

          {/* Badge strips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: "🥇 Gold Suppliers", value: "Gold Supplier" },
              { label: "✅ Verified",        value: "Verified Supplier" },
              { label: "🌿 Organic Certified", value: "" },
            ].map((b) => (
              <button
                key={b.label}
                onClick={() => { setBadge(badge === b.value ? "" : b.value); setPage(1); }}
                className="text-xs px-4 py-2 rounded-full font-semibold transition-all border"
                style={badge === b.value
                  ? { background: "#E8820C", color: "white", border: "1px solid #E8820C" }
                  : { background: "white", color: "#374151", border: "1px solid #E5E7EB" }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {paged.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>No suppliers found</h3>
              <p className="text-sm text-gray-500">Try different search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paged.map((s) => (
                <SupplierCard key={s.id} supplier={s} />
              ))}
            </div>
          )}

          <Pagination current={page} total={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        </div>
      </div>

      <Footer />
    </>
  );
}
