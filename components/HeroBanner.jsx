"use client";
// ─── HeroBanner Component ─────────────────────────────────────────────────────
// Layout:
//   [ Main Hero Slider (flex-1) ] [ Side Promo Cards (2 stacked, fixed 185px) ]
//
// The slider auto-advances every 4 seconds and supports manual dot navigation.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

// ── Slide definitions ──────────────────────────────────────────────────────────
const SLIDES = [
  {
    id:          0,
    eyebrow:     "Featured Category",
    headline:    "Premium Ceylon Tea",
    subline:     "World's finest orthodox teas",
    body:        "Direct from Sri Lanka's misty highlands to global markets. BOP, BOPF, Pekoe grades available.",
    cta:         "Explore Tea Products",
    gradient:    "from-emerald-900 via-emerald-800 to-teal-700",
    accentColor: "#34D399",
    emoji:       "🫖",
    stats:       [{ n: "980+", l: "Products" }, { n: "200+", l: "Exporters" }, { n: "45", l: "Countries" }],
  },
  {
    id:          1,
    eyebrow:     "Precious Stones",
    headline:    "Blue Sapphires & Gems",
    subline:     "GIA-certified precious stones",
    body:        "Sri Lanka — the 'Gem Island' — supplies the world with sapphires, rubies, cat's-eyes, and moonstones.",
    cta:         "Browse Gems",
    gradient:    "from-blue-950 via-blue-900 to-indigo-800",
    accentColor: "#60A5FA",
    emoji:       "💎",
    stats:       [{ n: "1.2K+", l: "Gem Types" }, { n: "400+", l: "Dealers" }, { n: "80+", l: "Countries" }],
  },
  {
    id:          2,
    eyebrow:     "Handloom & Batik",
    headline:    "Authentic Sri Lankan Textiles",
    subline:     "Artisan-crafted, export-ready",
    body:        "From Kandyan hand-looms to vibrant batik prints — sustainable, ethical, and export quality.",
    cta:         "Shop Textiles",
    gradient:    "from-purple-950 via-purple-900 to-fuchsia-800",
    accentColor: "#C084FC",
    emoji:       "🧵",
    stats:       [{ n: "2.1K+", l: "Products" }, { n: "300+", l: "Weavers" }, { n: "60+", l: "Countries" }],
  },
  {
    id:          3,
    eyebrow:     "True Cinnamon",
    headline:    "Organic Spices & Herbs",
    subline:     "Ceylon cinnamon, pepper & more",
    body:        "Sri Lanka produces the world's only true cinnamon (Cinnamomum verum). Organic certified.",
    cta:         "View Spices",
    gradient:    "from-amber-900 via-orange-900 to-red-900",
    accentColor: "#FCD34D",
    emoji:       "🌿",
    stats:       [{ n: "1.6K+", l: "Products" }, { n: "500+", l: "Farms" }, { n: "100+", l: "Countries" }],
  },
];

// ── Promo card definitions ─────────────────────────────────────────────────────
const PROMO_CARDS = [
  {
    icon:    "✅",
    title:   "Verified Suppliers",
    sub:     "500+ certified this month",
    cta:     "View Suppliers",
    bg:      "bg-[#E8820C]",
    textSub: "text-white/70",
  },
  {
    icon:    "🔒",
    title:   "Trade Assurance",
    sub:     "100% payment protection",
    cta:     "How it works",
    bg:      "bg-[#1E3A5F]",
    textSub: "text-white/60",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="flex gap-3 flex-1 min-w-0">

      {/* ── Main hero slider ── */}
      <div className={`relative flex-1 bg-gradient-to-br ${slide.gradient}
                        rounded-xl overflow-hidden min-h-[340px] flex items-center`}>

        {/* Large background emoji — decorative watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-12 select-none
                        text-[160px] opacity-[0.08] pointer-events-none">
          {slide.emoji}
        </div>

        {/* Decorative diagonal accent lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 top-0 h-full w-[1px] bg-white/5 rotate-12" />
          <div className="absolute -right-8 top-0 h-full w-[1px] bg-white/5 rotate-12" />
        </div>

        {/* Slide content */}
        <div className="relative z-10 px-10 py-8 max-w-[420px]">

          {/* Eyebrow label */}
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-2">
            {slide.eyebrow}
          </div>

          {/* Headline */}
          <h2 className="text-[2.2rem] font-black leading-tight text-white mb-1">
            {slide.headline}
          </h2>

          {/* Subline */}
          <p className="text-sm font-semibold mb-2" style={{ color: slide.accentColor }}>
            {slide.subline}
          </p>

          {/* Body text */}
          <p className="text-[13px] text-white/60 leading-relaxed mb-6">
            {slide.body}
          </p>

          {/* CTA button */}
          <button className="bg-[#E8820C] hover:bg-[#d4740a] text-white
                             px-6 py-2.5 rounded-lg text-sm font-bold transition-colors
                             hover:shadow-lg hover:shadow-orange-900/30">
            {slide.cta} →
          </button>

          {/* Mini stats row */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10">
            {slide.stats.map(({ n, l }) => (
              <div key={l}>
                <div className="text-base font-black text-white">{n}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="absolute bottom-4 left-10 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={[
                "h-2 rounded-full transition-all duration-300 bg-white",
                i === current ? "w-6 opacity-100" : "w-2 opacity-30",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-4 right-6 text-[11px] text-white/30 font-mono">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Side promo cards (stacked 2×) ── */}
      <div className="flex flex-col gap-3 w-[185px] flex-shrink-0">
        {PROMO_CARDS.map((card) => (
          <div key={card.title}
            className={`${card.bg} rounded-xl p-5 flex-1 flex flex-col justify-between
                        cursor-pointer hover:opacity-90 transition-opacity`}>

            {/* Card body */}
            <div>
              <div className="text-[2.2rem] mb-3">{card.icon}</div>
              <div className="text-white font-bold text-[15px] leading-tight">
                {card.title}
              </div>
              <div className={`${card.textSub} text-[12px] mt-1.5 leading-snug`}>
                {card.sub}
              </div>
            </div>

            {/* Card CTA */}
            <button className="text-[12px] text-white/70 hover:text-white underline
                               underline-offset-2 text-left mt-4 transition-colors">
              {card.cta} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
