"use client";
// ─── CategorySidebar Component (Milestone 02 redesign) ────────────────────────
// Reference: Made-in-China.com left sidebar
// Text-only category list · "≡ Categories" header · "More Categories >" footer
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { label: "Gems & Jewelry", slug: "gems-jewelry" },
  { label: "Ceylon Tea & Beverages", slug: "ceylon-tea" },
  { label: "Apparel & Textiles", slug: "apparel-textiles" },
  { label: "Spices & Agriculture", slug: "spices-agriculture" },
  { label: "Handicrafts & Arts", slug: "handicrafts-arts" },
  { label: "Coconut Products", slug: "coconut-products" },
  { label: "Wood & Furniture", slug: "wood-furniture" },
  { label: "Seafood & Marine", slug: "seafood-marine" },
  { label: "Beauty & Personal Care", slug: "beauty-care" },
  { label: "Building & Construction", slug: "building-construction" },
  { label: "Industrial Machinery", slug: "industrial-machinery" },
  { label: "Gifts & Novelties", slug: "gifts-novelties" },
  { label: "Electronics & Tech", slug: "electronics-tech" },
  { label: "Packaging & Printing", slug: "packaging-printing" },
  { label: "Health & Ayurveda", slug: "health-ayurveda" },
];

export default function CategorySidebar() {
  const [hovered, setHovered] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? CATEGORIES : CATEGORIES.slice(0, 13);

  return (
    <aside className="w-[240px] flex-shrink-0 bg-white border border-gray-200">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <span className="font-bold text-[15px] text-gray-800">Categories</span>
      </div>

      {/* Category list */}
      <ul>
        {visible.map(({ label, slug }, i) => (
          <li key={slug}>
            <Link
              href={`/categories/${slug}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`block w-full text-left px-4 py-2 text-[13px] transition-colors
                          ${hovered === i
                            ? "bg-orange-50 text-[#E8820C]"
                            : "text-gray-600 hover:text-[#E8820C]"}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* More / Less toggle */}
      <div className="px-4 py-2.5 border-t border-gray-100">
        <button
          onClick={() => setShowAll(s => !s)}
          className="text-[13px] text-[#0066CC] hover:text-[#E8820C]
                     font-medium transition-colors flex items-center gap-1">
          {showAll ? "Less Categories ∧" : "More Categories >"}
        </button>
      </div>
    </aside>
  );
}
