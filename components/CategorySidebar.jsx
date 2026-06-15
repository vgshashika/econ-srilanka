"use client";
// ─── CategorySidebar Component ────────────────────────────────────────────────
// A fixed-width vertical sidebar listing all major product categories.
// Hovering a row highlights it and reveals the ">" chevron.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

const CATEGORIES = [
  { emoji: "💎", label: "Gems & Jewelry",         count: 1_240 },
  { emoji: "🫖", label: "Ceylon Tea",               count: 980  },
  { emoji: "👗", label: "Apparel & Textiles",       count: 2_100 },
  { emoji: "🌿", label: "Spices & Agriculture",     count: 1_640 },
  { emoji: "🏺", label: "Handicrafts & Arts",       count: 540  },
  { emoji: "🥥", label: "Coconut Products",         count: 720  },
  { emoji: "🪵", label: "Wood & Furniture",         count: 430  },
  { emoji: "🐟", label: "Seafood & Marine",         count: 320  },
  { emoji: "🧴", label: "Beauty & Personal Care",   count: 670  },
  { emoji: "🏗️", label: "Building & Construction",  count: 890  },
  { emoji: "⚙️", label: "Industrial Machinery",    count: 350  },
  { emoji: "🎁", label: "Gifts & Novelties",        count: 480  },
];

export default function CategorySidebar() {
  const [hovered, setHovered] = useState(null);

  return (
    /* Sidebar: 210px wide, same height as the hero banner */
    <aside className="w-[210px] flex-shrink-0 bg-white border border-gray-200
                      rounded-xl shadow-sm overflow-hidden flex flex-col">

      {/* Header strip */}
      <div className="bg-[#1E3A5F] text-white text-[13px] font-semibold
                      px-4 py-2.5 flex-shrink-0 tracking-wide">
        Product Categories
      </div>

      {/* Category list */}
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100/80">
        {CATEGORIES.map(({ emoji, label, count }, i) => (
          <li key={i}>
            <button
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors",
                hovered === i
                  ? "bg-orange-50 border-l-2 border-[#E8820C]"
                  : "border-l-2 border-transparent",
              ].join(" ")}>

              {/* Emoji icon */}
              <span className="text-[18px] flex-shrink-0 w-6 text-center">{emoji}</span>

              {/* Label + count */}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-gray-800 truncate leading-tight">
                  {label}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {count.toLocaleString()} products
                </div>
              </div>

              {/* Chevron – visible on hover */}
              <span className={[
                "text-[#E8820C] text-xs font-bold transition-opacity",
                hovered === i ? "opacity-100" : "opacity-0",
              ].join(" ")}>›</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer: View All */}
      <div className="border-t border-gray-100 px-3 py-2.5 flex-shrink-0 bg-gray-50">
        <button className="w-full text-center text-[12px] text-[#E8820C]
                           hover:text-[#d4740a] font-semibold transition-colors">
          View All Categories →
        </button>
      </div>
    </aside>
  );
}
