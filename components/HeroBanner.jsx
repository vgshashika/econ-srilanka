"use client";
// ─── HeroBanner Component (Milestone 02 redesign) ─────────────────────────────
// Reference: Made-in-China.com center hero
// Full-width gradient slider + product image cards floating at bottom + slide dots
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES = [
  {
    gradient: "from-violet-700 via-purple-600 to-blue-500",
    eyebrow:  "Featured Export",
    headline: "Sourcing Premium Ceylon Tea",
    sub:      "Connect with 200+ certified tea estates",
    cta:      "Explore Now",
    href:     "/categories/ceylon-tea",
    products: [
      { label: "BOP Grade Tea",    emoji: "🫖", bg: "bg-emerald-50", href: "/categories/ceylon-tea" },
      { label: "Silver Tips Tea",  emoji: "🍃", bg: "bg-green-50",   href: "/categories/ceylon-tea" },
      { label: "Herbal Infusions", emoji: "🌿", bg: "bg-lime-50",    href: "/products" },
      { label: "White Tea",        emoji: "☕", bg: "bg-gray-50",    href: "/products" },
    ],
  },
  {
    gradient: "from-blue-800 via-indigo-700 to-violet-600",
    eyebrow:  "Gem Island",
    headline: "Blue Sapphires & Precious Gems",
    sub:      "GIA-certified stones from Ratnapura",
    cta:      "Browse Gems",
    href:     "/categories/gems-jewelry",
    products: [
      { label: "Blue Sapphire",   emoji: "💎", bg: "bg-blue-50",   href: "/categories/gems-jewelry" },
      { label: "Star Ruby",       emoji: "❤️",  bg: "bg-red-50",    href: "/categories/gems-jewelry" },
      { label: "Cat's Eye",       emoji: "👁️",  bg: "bg-yellow-50", href: "/products" },
      { label: "Moonstone",       emoji: "🔮", bg: "bg-slate-50",  href: "/products" },
    ],
  },
  {
    gradient: "from-amber-700 via-orange-600 to-yellow-500",
    eyebrow:  "True Cinnamon",
    headline: "Organic Spices & Herbs",
    sub:      "World's only true cinnamon — export certified",
    cta:      "View Spices",
    href:     "/categories/spices-agriculture",
    products: [
      { label: "True Cinnamon",  emoji: "🌿", bg: "bg-amber-50",  href: "/categories/spices-agriculture" },
      { label: "Black Pepper",   emoji: "⚫", bg: "bg-gray-100",  href: "/categories/spices-agriculture" },
      { label: "Cardamom",       emoji: "🌱", bg: "bg-green-50", href: "/products" },
      { label: "Cloves",         emoji: "🍀", bg: "bg-emerald-50", href: "/products" },
    ],
  },
  {
    gradient: "from-purple-800 via-fuchsia-700 to-pink-500",
    eyebrow:  "Handloom & Batik",
    headline: "Authentic Sri Lankan Textiles",
    sub:      "Artisan-crafted, export-ready fabrics",
    cta:      "Shop Textiles",
    href:     "/categories/apparel-textiles",
    products: [
      { label: "Batik Fabric",    emoji: "🧵", bg: "bg-purple-50", href: "/categories/apparel-textiles" },
      { label: "Handloom Saree",  emoji: "👗", bg: "bg-pink-50",   href: "/categories/apparel-textiles" },
      { label: "Dumbara Weave",   emoji: "🎨", bg: "bg-fuchsia-50", href: "/products" },
      { label: "Tie-Dye Cotton",  emoji: "🌈", bg: "bg-indigo-50", href: "/products" },
    ],
  },
];

export default function HeroBanner() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[cur];

  return (
    <div className="relative overflow-hidden"
         style={{ minHeight: 400 }}>

      {/* ── Gradient background ── */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-700`}/>

      {/* ── Decorative pattern overlay ── */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}/>

      {/* ── Slide text ── */}
      <div className="relative z-10 pt-10 pl-10 pb-4 max-w-[440px]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-2">
          {slide.eyebrow}
        </div>
        <h2 className="text-[2.2rem] font-black text-white leading-tight mb-2">
          {slide.headline}
        </h2>
        <p className="text-[13px] text-white/70 mb-5">{slide.sub}</p>
        <Link href={slide.href}
          className="inline-flex items-center bg-white text-[#E8820C] hover:bg-gray-100
                     px-5 py-2.5 rounded-full text-sm font-bold
                     transition-colors shadow-lg">
          {slide.cta} →
        </Link>
      </div>

      {/* ── Product image cards (floating at bottom, like reference) ── */}
      <div className="relative z-10 flex gap-3 px-8 pt-4 pb-6">
        {slide.products.map(({ label, emoji, bg, href }) => (
          <Link key={label} href={href}
            className={`${bg} rounded-xl shadow-md flex-1 flex flex-col
                         items-center justify-center py-5 cursor-pointer
                         hover:shadow-lg hover:-translate-y-1 transition-all`}>
            <span className="text-5xl mb-2">{emoji}</span>
            <span className="text-[11px] font-semibold text-gray-700 text-center px-2 leading-tight">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`rounded-full transition-all duration-300
                        ${i === cur
                          ? "w-5 h-2.5 bg-white"
                          : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"}`}/>
        ))}
      </div>
    </div>
  );
}
