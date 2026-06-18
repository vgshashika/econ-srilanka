"use client";
// ─── MegaMenu Component ───────────────────────────────────────────────────────
// Appears below the "All Categories" button in Navbar when hovered.
//
// Layout:
//   [Left 220px: category list] [Right: 3-column sub-category grid + promo card]
//
// Usage (in Navbar.jsx):
//   import MegaMenu from "./MegaMenu";
//   <MegaMenu activeId={activeId} onHover={setActiveId} />
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { useState } from "react";

// ── Category + sub-category data ──────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 0,
    emoji: "💎",
    label: "Gems & Jewelry",
    cols: [
      ["Blue Sapphires", "Star Sapphires", "Padparadscha", "Fancy Sapphires"],
      ["Rubies & Spinels", "Cat's Eye", "Alexandrite", "Chrysoberyl"],
      ["Moonstone", "Amethyst", "Topaz", "Zircon & Garnet"],
    ],
    promo: {
      tag: "Hot",
      headline: "Ratnapura Gem Trade Fair 2025",
      sub: "Connect with 200+ certified gem dealers",
      cta: "Register Now",
      bg: "bg-blue-900",
    },
  },
  {
    id: 1,
    emoji: "🫖",
    label: "Ceylon Tea",
    cols: [
      ["BOP Grade", "BOPF Grade", "Pekoe Grade", "OP Grade"],
      ["Green Tea", "White Tea", "Silver Tips", "Herbal Infusions"],
      ["High Grown", "Mid Grown", "Low Grown", "Organic Certified"],
    ],
    promo: {
      tag: "Export Ready",
      headline: "Ceylon Tea Export Hub",
      sub: "ISO-certified estates direct to your market",
      cta: "View Estates",
      bg: "bg-emerald-900",
    },
  },
  {
    id: 2,
    emoji: "👗",
    label: "Apparel & Textiles",
    cols: [
      ["Batik Fabric", "Handloom Sarees", "Dumbara Weave", "Tie-Dye Cotton"],
      ["Men's Wear", "Women's Wear", "Children's Wear", "Beachwear"],
      ["Export Knits", "Sports Wear", "Uniform Fabric", "Eco Textiles"],
    ],
    promo: {
      tag: "Trending",
      headline: "Sustainable Sri Lankan Fashion",
      sub: "GOTS certified organic textile suppliers",
      cta: "Browse Brands",
      bg: "bg-purple-900",
    },
  },
  {
    id: 3,
    emoji: "🌿",
    label: "Spices & Agriculture",
    cols: [
      ["True Cinnamon", "Black Pepper", "Cardamom", "Cloves & Nutmeg"],
      ["Organic Turmeric", "Ginger Root", "Chilli Varieties", "Curry Leaf"],
      ["Coconut Oil", "King Coconut", "Arecanut", "Vanilla Pods"],
    ],
    promo: {
      tag: "Organic",
      headline: "Ceylon Spice Collective",
      sub: "Farm-to-export certified organic spices",
      cta: "Order Samples",
      bg: "bg-amber-900",
    },
  },
  {
    id: 4,
    emoji: "🏺",
    label: "Handicrafts & Arts",
    cols: [
      ["Dumbara Mats", "Pottery & Ceramics", "Lacquerware", "Coir Products"],
      ["Kandyan Masks", "Wooden Elephants", "Batik Paintings", "Brass Work"],
      ["Reed Baskets", "Leather Goods", "Shell Craft", "Coconut Shell Art"],
    ],
    promo: {
      tag: "Artisan",
      headline: "Lankan Artisan Market",
      sub: "Fair-trade handcraft from 500+ artisans",
      cta: "Shop Artisans",
      bg: "bg-orange-900",
    },
  },
  {
    id: 5,
    emoji: "🥥",
    label: "Coconut Products",
    cols: [
      ["Virgin Coconut Oil", "Coconut Milk", "Coconut Cream", "Coconut Water"],
      ["Desiccated Coconut", "Coconut Flour", "Coconut Sugar", "Coconut Vinegar"],
      ["Coir Fibre", "Coir Pith", "Activated Charcoal", "Coconut Shell Items"],
    ],
    promo: {
      tag: "Popular",
      headline: "Coconut Export Collective",
      sub: "Sri Lanka – world's top coconut exporter",
      cta: "View Suppliers",
      bg: "bg-lime-900",
    },
  },
  {
    id: 6,
    emoji: "🪵",
    label: "Wood & Furniture",
    cols: [
      ["Teak Furniture", "Ebony Wood", "Jak Wood Items", "Rattan Furniture"],
      ["Bedroom Sets", "Dining Tables", "Carved Panels", "Driftwood Art"],
      ["Garden Furniture", "Decking Boards", "Veneer Sheets", "Plywood Export"],
    ],
    promo: {
      tag: "New",
      headline: "Lankan Wood Exporters Guild",
      sub: "FSC-certified sustainable timber products",
      cta: "Explore Range",
      bg: "bg-stone-800",
    },
  },
  {
    id: 7,
    emoji: "🐟",
    label: "Seafood & Marine",
    cols: [
      ["Skipjack Tuna", "Yellowfin Tuna", "Maldive Fish", "Seer Fish"],
      ["Prawns & Shrimp", "Lobster", "Crab", "Squid & Cuttlefish"],
      ["Dried Fish", "Canned Tuna", "Fish Meal", "Fish Oil"],
    ],
    promo: {
      tag: "HACCP",
      headline: "Ceylon Fresh Seafood Hub",
      sub: "EU-approved HACCP certified processing plants",
      cta: "Get Catalogue",
      bg: "bg-cyan-900",
    },
  },
  {
    id: 8,
    emoji: "🧴",
    label: "Beauty & Personal Care",
    cols: [
      ["Ayurvedic Skincare", "Coconut Soap", "Herbal Shampoo", "Body Butter"],
      ["Cinnamon Cosmetics", "Aloe Vera Gel", "Neem Products", "Essential Oils"],
      ["Ayurvedic Oils", "Herbal Toothpaste", "Spa Products", "Bath Salts"],
    ],
    promo: {
      tag: "Ayurvedic",
      headline: "Pure Ceylon Beauty",
      sub: "100% natural ingredients from Sri Lanka",
      cta: "View Products",
      bg: "bg-pink-900",
    },
  },
  {
    id: 9,
    emoji: "🏗️",
    label: "Building & Construction",
    cols: [
      ["Cement & Concrete", "Ceramic Tiles", "Roof Tiles", "Clay Bricks"],
      ["Granite Slabs", "Marble Tiles", "Quarry Stones", "Laterite Blocks"],
      ["Steel Rods", "GI Sheets", "PVC Pipes", "Aluminium Profiles"],
    ],
    promo: {
      tag: "B2B",
      headline: "Lanka Build Expo 2025",
      sub: "Meet 300+ construction product suppliers",
      cta: "Register Free",
      bg: "bg-slate-800",
    },
  },
  {
    id: 10,
    emoji: "⚙️",
    label: "Industrial Machinery",
    cols: [
      ["Tea Processing", "Coconut Machinery", "Rubber Processing", "Rice Mills"],
      ["Garment Machines", "Printing Press", "Packaging Lines", "Conveyors"],
      ["Generators", "Compressors", "Pumps & Motors", "Lab Equipment"],
    ],
    promo: {
      tag: "Export",
      headline: "Industrial Machinery Connect",
      sub: "Quality certified machinery from Sri Lanka",
      cta: "Find Machines",
      bg: "bg-gray-800",
    },
  },
  {
    id: 11,
    emoji: "🎁",
    label: "Gifts & Novelties",
    cols: [
      ["Corporate Gifts", "Tea Gift Sets", "Gem Gift Boxes", "Spice Hampers"],
      ["Handicraft Gifts", "Batik Gift Items", "Elephant Figurines", "Pottery"],
      ["Eco Gifts", "Wedding Favours", "Customized Items", "Souvenir Sets"],
    ],
    promo: {
      tag: "Custom",
      headline: "Lanka Gift Wholesale Hub",
      sub: "MOQ from 50 units with custom branding",
      cta: "Get Quote",
      bg: "bg-rose-900",
    },
  },
];

// Tag badge colours
const TAG_COLORS = {
  Hot:           "bg-red-500",
  "Export Ready": "bg-green-600",
  Trending:      "bg-pink-500",
  Organic:       "bg-green-700",
  Artisan:       "bg-amber-600",
  Popular:       "bg-lime-700",
  New:           "bg-blue-500",
  HACCP:         "bg-cyan-700",
  Ayurvedic:     "bg-fuchsia-700",
  B2B:           "bg-slate-600",
  Export:        "bg-indigo-600",
  Custom:        "bg-rose-600",
};

// ── MegaMenu component ────────────────────────────────────────────────────────
export default function MegaMenu({ onMouseEnter, onMouseLeave }) {
  const [activeId, setActiveId] = useState(0);

  const active = CATEGORIES[activeId];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 z-50 w-[860px]
                 bg-white border border-gray-200 rounded-b-xl shadow-2xl
                 flex overflow-hidden"
      style={{ marginTop: "1px" }}
    >
      {/* ── Left: category list ── */}
      <div className="w-[220px] flex-shrink-0 bg-[#F5F7FA] border-r border-gray-200 py-2">
        {CATEGORIES.map(({ id, emoji, label }) => (
          <button
            key={id}
            onMouseEnter={() => setActiveId(id)}
            className={[
              "w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
              activeId === id
                ? "bg-white text-[#E8820C] font-semibold border-l-2 border-[#E8820C]"
                : "text-gray-700 hover:bg-white hover:text-gray-900 border-l-2 border-transparent",
            ].join(" ")}
          >
            <span className="text-base w-5 text-center flex-shrink-0">{emoji}</span>
            <span className="truncate leading-tight">{label}</span>
            <span className="ml-auto text-gray-300 text-xs">›</span>
          </button>
        ))}
      </div>

      {/* ── Right: sub-categories + promo ── */}
      <div className="flex-1 p-5 flex flex-col gap-4">

        {/* Section header */}
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <span className="text-xl">{active.emoji}</span>
          <h3 className="text-sm font-bold text-gray-900">{active.label}</h3>
          <Link
            href="#"
            className="ml-auto text-xs text-[#E8820C] hover:underline font-medium"
          >
            View all {active.label} →
          </Link>
        </div>

        {/* Sub-category columns */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-0 flex-1">
          {active.cols.map((col, ci) => (
            <ul key={ci} className="space-y-1">
              {col.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[12px] text-gray-600 hover:text-[#E8820C]
                               hover:underline underline-offset-2 block py-0.5 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Promo card */}
        <div
          className={`${active.promo.bg} rounded-lg px-4 py-3 flex items-center
                       justify-between gap-4 flex-shrink-0`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`${TAG_COLORS[active.promo.tag] ?? "bg-gray-600"}
                           text-white text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0`}
            >
              {active.promo.tag}
            </span>
            <div>
              <div className="text-white font-semibold text-[13px] leading-tight">
                {active.promo.headline}
              </div>
              <div className="text-white/60 text-[11px] mt-0.5">
                {active.promo.sub}
              </div>
            </div>
          </div>
          <button
            className="bg-[#E8820C] hover:bg-[#d4740a] text-white text-[11px]
                         font-bold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            {active.promo.cta} →
          </button>
        </div>
      </div>
    </div>
  );
}
