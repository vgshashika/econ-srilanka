"use client";
// ─── RecommendedProducts Component ───────────────────────────────────────────
// Section below the hero.  Renders:
//   • Section header + "View All" link
//   • Horizontal category tabs for filtering
//   • 4-column responsive product card grid
//   • Each card: image area, badge, title, price, min order, stars, supplier
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

// ── Tab labels ─────────────────────────────────────────────────────────────────
const TABS = [
  "All Products",
  "Ceylon Tea",
  "Gems & Jewelry",
  "Spices",
  "Apparel",
  "Handicrafts",
  "Seafood",
];

// ── Product data (Sri Lanka-specific mock) ────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, category: "Ceylon Tea",
    name:      "Premium Ceylon Loose Leaf Tea – BOP Grade",
    price:     "$8 – $15",  unit: "/kg",
    minOrder:  "50 kg MOQ",
    supplier:  "Dilmah Exports Pvt Ltd",
    location:  "Colombo",
    rating: 4.8, reviews: 124,
    badge: "Top Supplier",  tag: "Hot",
    emoji: "🫖", bg: "from-emerald-100 to-teal-50",
  },
  {
    id: 2, category: "Gems & Jewelry",
    name:      "Natural Blue Sapphire Gemstone – GIA Certified",
    price:     "$200 – $2,000", unit: "/carat",
    minOrder:  "1 carat MOQ",
    supplier:  "Lanka Gem Bureau Ltd",
    location:  "Ratnapura",
    rating: 4.9, reviews: 67,
    badge: "Verified", tag: "Premium",
    emoji: "💎", bg: "from-blue-100 to-indigo-50",
  },
  {
    id: 3, category: "Apparel",
    name:      "Handwoven Batik Fabric Roll – 100% Cotton",
    price:     "$3 – $8", unit: "/metre",
    minOrder:  "200 m MOQ",
    supplier:  "Lanka Batik Creations",
    location:  "Kandy",
    rating: 4.7, reviews: 89,
    badge: "Verified", tag: "New",
    emoji: "🧵", bg: "from-purple-100 to-fuchsia-50",
  },
  {
    id: 4, category: "Spices",
    name:      "Organic Ceylon Cinnamon Sticks (True Cinnamon)",
    price:     "$5 – $12", unit: "/kg",
    minOrder:  "25 kg MOQ",
    supplier:  "Spice Garden Lanka",
    location:  "Matara",
    rating: 4.9, reviews: 203,
    badge: "Top Supplier", tag: "Organic",
    emoji: "🌿", bg: "from-amber-100 to-yellow-50",
  },
  {
    id: 5, category: "Handicrafts",
    name:      "Handcrafted Dumbara Mat – Traditional Weave",
    price:     "$15 – $45", unit: "/piece",
    minOrder:  "20 pcs MOQ",
    supplier:  "Village Craft Collective",
    location:  "Kurunegala",
    rating: 4.6, reviews: 41,
    badge: "Verified", tag: "Artisan",
    emoji: "🏺", bg: "from-orange-100 to-amber-50",
  },
  {
    id: 6, category: "Gems & Jewelry",
    name:      "Moonstone Pendant – Sterling Silver Setting",
    price:     "$25 – $80", unit: "/piece",
    minOrder:  "10 pcs MOQ",
    supplier:  "Moonstone Jewellers Lanka",
    location:  "Colombo",
    rating: 4.8, reviews: 58,
    badge: "Verified", tag: "Trending",
    emoji: "🔮", bg: "from-slate-100 to-gray-50",
  },
  {
    id: 7, category: "Spices",
    name:      "Virgin Coconut Oil – Cold-Pressed Export Grade",
    price:     "$2.50 – $5", unit: "/litre",
    minOrder:  "500 L MOQ",
    supplier:  "Coconut Lanka Exports",
    location:  "Gampaha",
    rating: 4.7, reviews: 156,
    badge: "Top Supplier", tag: "Organic",
    emoji: "🥥", bg: "from-lime-100 to-green-50",
  },
  {
    id: 8, category: "Seafood",
    name:      "Dried Maldive Fish (Tuna) – Export Grade",
    price:     "$10 – $18", unit: "/kg",
    minOrder:  "100 kg MOQ",
    supplier:  "Lanka Marine Exports",
    location:  "Negombo",
    rating: 4.5, reviews: 33,
    badge: "Verified", tag: "Fresh",
    emoji: "🐟", bg: "from-cyan-100 to-sky-50",
  },
];

// ── Tag → badge colour mapping ─────────────────────────────────────────────────
const TAG_COLORS = {
  Hot:      "bg-red-500",
  Premium:  "bg-purple-600",
  New:      "bg-blue-500",
  Organic:  "bg-green-600",
  Artisan:  "bg-amber-600",
  Trending: "bg-pink-500",
  Fresh:    "bg-cyan-600",
};

// ── Star rating sub-component ──────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" fill="currentColor"
          className={`w-3 h-3 ${n <= Math.round(rating) ? "text-[#E8820C]" : "text-gray-200"}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Single product card ────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const { name, price, unit, minOrder, supplier, location, rating, reviews, badge, tag, emoji, bg } = product;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden
                    hover:shadow-lg hover:border-orange-200 transition-all group cursor-pointer">

      {/* Image area */}
      <div className={`bg-gradient-to-br ${bg} h-44 flex items-center justify-center relative`}>
        <span className="text-[4.5rem] group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>

        {/* Tag badge */}
        <div className={`absolute top-2.5 left-2.5 ${TAG_COLORS[tag] ?? "bg-gray-500"}
                          text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
          {tag}
        </div>

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors
                        flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
          <button className="bg-white text-gray-800 text-xs px-4 py-1.5 rounded-full
                             shadow-md font-semibold hover:bg-gray-50 transition-colors">
            Quick View
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="p-3.5">

        {/* Name (clamped to 2 lines) */}
        <h3 className="text-[12px] font-semibold text-gray-800 line-clamp-2
                       leading-snug mb-2 min-h-[32px]">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-0.5">
          <span className="text-[#E8820C] font-bold text-[15px]">{price}</span>
          <span className="text-gray-400 text-[10px]">{unit}</span>
        </div>
        <div className="text-[10px] text-gray-400 mb-2">{minOrder}</div>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={rating} />
          <span className="text-[11px] font-semibold text-gray-700">{rating}</span>
          <span className="text-[10px] text-gray-400">({reviews})</span>
        </div>

        {/* Supplier info */}
        <div className="border-t border-gray-100 pt-2.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            {badge === "Top Supplier" && (
              <span className="bg-orange-100 text-[#E8820C] text-[9px] font-black
                               px-1.5 py-0.5 rounded uppercase tracking-wide">
                TOP
              </span>
            )}
            {badge === "Verified" && (
              <span className="bg-blue-50 text-blue-600 text-[9px] font-bold
                               px-1.5 py-0.5 rounded">
                ✓ Verified
              </span>
            )}
            <span className="text-[11px] text-gray-600 truncate font-medium">
              {supplier}
            </span>
          </div>
          <div className="text-[10px] text-gray-400">
            📍 {location}, Sri Lanka
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main exported component ────────────────────────────────────────────────────
export default function RecommendedProducts() {
  const [activeTab, setActiveTab] = useState("All Products");

  const filtered =
    activeTab === "All Products"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#E8820C] rounded-full" />
          <h2 className="text-lg font-bold text-gray-900">Recommended Products</h2>
          <span className="text-[12px] text-gray-400 font-normal">
            Curated from verified Sri Lankan exporters
          </span>
        </div>
        <a href="#" className="text-[13px] text-[#E8820C] hover:text-[#d4740a] font-semibold">
          View All Products →
        </a>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-0.5 border-b border-gray-200 mb-5 -mx-1 px-1">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={[
              "px-4 py-2 text-[13px] font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              activeTab === tab
                ? "border-[#E8820C] text-[#E8820C]"
                : "border-transparent text-gray-500 hover:text-gray-800",
            ].join(" ")}>
            {tab}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm">No products found in this category yet.</p>
        </div>
      )}
    </section>
  );
}
