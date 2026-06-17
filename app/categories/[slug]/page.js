"use client";
import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import InquiryModal from "@/components/InquiryModal";
import Pagination from "@/components/Pagination";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

const PER_PAGE = 8;
const SORT_OPTIONS = [
  { value: "default",     label: "Best Match" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "price_asc",   label: "Price: Low → High" },
  { value: "price_desc",  label: "Price: High → Low" },
  { value: "inquiries",   label: "Most Inquired" },
];

export default function CategoryPage() {
  const { slug }       = useParams();
  const [sort, setSort]     = useState("default");
  const [page, setPage]     = useState(1);
  const [inquiry, setInquiry] = useState(null);

  const category = CATEGORIES.find((c) => c.slug === slug) || {
    name: slug?.replace(/-/g, " "),
    emoji: "📦",
    slug,
    count: 0,
  };

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.categorySlug === slug);
    if (sort === "rating_desc")  list.sort((a, b) => b.rating - a.rating);
    if (sort === "price_asc")    list.sort((a, b) => a.priceMin - b.priceMin);
    if (sort === "price_desc")   list.sort((a, b) => b.priceMax - a.priceMax);
    if (sort === "inquiries")    list.sort((a, b) => b.inquiries - a.inquiries);
    return list;
  }, [slug, sort]);

  const totalPages = Math.ceil(products.length / PER_PAGE);
  const paged = products.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Category banner */}
        <div style={{ background: "#0C1E35" }} className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb crumbs={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: category.name },
            ]} />
            <div className="flex items-center gap-4 mt-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                {category.emoji}
              </div>
              <div>
                <h1 className="text-2xl font-black text-white capitalize">
                  {category.name}
                </h1>
                <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {products.length} product{products.length !== 1 ? "s" : ""} from verified Sri Lankan exporters
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* All categories row */}
          <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border"
                style={c.slug === slug
                  ? { background: "#E8820C", color: "white", border: "1px solid #E8820C" }
                  : { background: "white", color: "#374151", border: "1px solid #E5E7EB" }}
              >
                {c.emoji} {c.name}
              </a>
            ))}
          </div>

          {/* Toolbar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white rounded-2xl px-4 py-3"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <span className="text-sm text-gray-600">
              <span className="font-bold" style={{ color: "#0C1E35" }}>{products.length}</span> products in{" "}
              <span className="font-semibold capitalize">{category.name}</span>
            </span>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              style={{ color: "#374151" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">{category.emoji}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>
                No products in this category yet
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                Be the first to list in{" "}
                <span className="font-semibold capitalize">{category.name}</span>
              </p>
              <a
                href="/register?role=seller"
                className="inline-block px-6 py-3 rounded-xl text-sm font-bold"
                style={{ background: "#E8820C", color: "white" }}
              >
                List Your Products
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paged.map((p) => (
                  <ProductCard key={p.id} product={p} onInquire={setInquiry} />
                ))}
              </div>
              <Pagination
                current={page}
                total={totalPages}
                onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              />
            </>
          )}
        </div>
      </div>

      <Footer />
      {inquiry && <InquiryModal product={inquiry} onClose={() => setInquiry(null)} />}
    </>
  );
}
