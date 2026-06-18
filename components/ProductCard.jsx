"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TAG_COLORS } from "@/lib/data";

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={s <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

export default function ProductCard({ product, onInquire }) {
  const [saved, setSaved] = useState(false);
  const tagColor = TAG_COLORS[product.tag] || "bg-gray-500";

  function toggleSaved(e) {
    e.preventDefault();
    setSaved((prev) => {
      const next = !prev;
      try {
        const savedIds = JSON.parse(localStorage.getItem("ecom_wishlist") || "[]");
        const updated = next
          ? Array.from(new Set([...savedIds, product.id]))
          : savedIds.filter((id) => id !== product.id);
        localStorage.setItem("ecom_wishlist", JSON.stringify(updated));
      } catch {}
      return next;
    });
  }

  useEffect(() => {
    try {
      const savedIds = JSON.parse(localStorage.getItem("ecom_wishlist") || "[]");
      setSaved(savedIds.includes(product.id));
    } catch {}
  }, [product.id]);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col group transition-all duration-200"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Image area */}
      <div className={`relative h-44 bg-gradient-to-br ${product.bg} flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
          {product.emoji}
        </span>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ background: "#0C1E35", color: "white" }}
            >
              {product.badge === "Top Supplier" ? "⭐" : "✅"} {product.badge}
            </span>
          )}
          {product.tag && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${tagColor}`}>
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleSaved}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        >
          <svg className="w-4 h-4" fill={saved ? "#E8820C" : "none"} viewBox="0 0 24 24" stroke={saved ? "#E8820C" : "#6B7280"} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium mb-1" style={{ color: "#E8820C" }}>
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3
            className="text-sm font-bold leading-snug mb-2 line-clamp-2 hover:underline"
            style={{ color: "#0C1E35" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-base font-black" style={{ color: "#E8820C" }}>
            {product.price}
          </span>
          <span className="text-xs text-gray-500">{product.unit}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">{product.minOrder}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs font-semibold" style={{ color: "#0C1E35" }}>
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Supplier & Location */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <Link
            href={`/suppliers/${product.supplierId}`}
            className="font-medium truncate hover:underline max-w-[60%]"
            style={{ color: "#0C1E35" }}
          >
            {product.supplier}
          </Link>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {product.location}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onInquire && onInquire(product)}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-150 hover:opacity-90 active:scale-95"
            style={{ background: "#E8820C", color: "white" }}
          >
            💬 Inquire Now
          </button>
          <Link
            href={`/products/${product.id}`}
            className="px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-150 hover:bg-gray-50"
            style={{ border: "1px solid #E8820C", color: "#E8820C" }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
