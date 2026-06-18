"use client";
// ─── CategorySidebar Component (Milestone 02 redesign) ────────────────────────
// Reference: Made-in-China.com left sidebar
// Text-only category list · "≡ Categories" header · "More Categories >" footer
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

const CATEGORIES = [
  "Gems & Jewelry",
  "Ceylon Tea & Beverages",
  "Apparel & Textiles",
  "Spices & Agriculture",
  "Handicrafts & Arts",
  "Coconut Products",
  "Wood & Furniture",
  "Seafood & Marine",
  "Beauty & Personal Care",
  "Building & Construction",
  "Industrial Machinery",
  "Gifts & Novelties",
  "Electronics & Tech",
  "Packaging & Printing",
  "Health & Ayurveda",
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
        {visible.map((label, i) => (
          <li key={i}>
            <button
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`w-full text-left px-4 py-2 text-[13px] transition-colors
                          ${hovered === i
                            ? "bg-orange-50 text-[#E8820C]"
                            : "text-gray-600 hover:text-[#E8820C]"}`}>
              {label}
            </button>
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
