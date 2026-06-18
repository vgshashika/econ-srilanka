// ─── FeatureCards Component ───────────────────────────────────────────────────
// Static section (no state needed → Server Component, no "use client").
// Shows 4 B2B trust / USP cards in a row.
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon:     "🏭",
    title:    "10,000+ Verified Suppliers",
    body:     "Every supplier on Ecom.lk is rigorously verified for product quality, export capacity, and legal compliance.",
    cta:      "Find Suppliers",
    border:   "border-t-blue-500",
    iconBg:   "bg-blue-50",
    ctaColor: "text-blue-600 hover:text-blue-700",
  },
  {
    icon:     "🔒",
    title:    "Trade Assurance",
    body:     "Your payment is held securely in escrow until you confirm goods are received and meet agreed specifications.",
    cta:      "Learn More",
    border:   "border-t-green-500",
    iconBg:   "bg-green-50",
    ctaColor: "text-green-600 hover:text-green-700",
  },
  {
    icon:     "🚢",
    title:    "Global Export Ready",
    body:     "All suppliers provide customs documentation, HS codes, and shipping to 120+ countries via major freight lines.",
    cta:      "Export Guide",
    border:   "border-t-purple-500",
    iconBg:   "bg-purple-50",
    ctaColor: "text-purple-600 hover:text-purple-700",
  },
  {
    icon:     "🤝",
    title:    "Dedicated Trade Support",
    body:     "Expert trade advisors are available Mon–Sat 8AM–6PM (Sri Lanka time) to assist with sourcing and negotiations.",
    cta:      "Contact Support",
    border:   "border-t-[#E8820C]",
    iconBg:   "bg-orange-50",
    ctaColor: "text-[#E8820C] hover:text-[#d4740a]",
  },
];

// ── Stat bar data ──────────────────────────────────────────────────────────────
const STATS = [
  { n: "10,000+", l: "Verified Suppliers" },
  { n: "50,000+", l: "Products Listed"    },
  { n: "120+",    l: "Export Countries"   },
  { n: "15 yrs",  l: "Industry Experience"},
];

export default function FeatureCards() {
  return (
    <section className="bg-[#F0F4F8] border-t border-gray-200 pt-10 pb-12">
      <div className="max-w-[1280px] mx-auto px-4">

        {/* ── Stats bar ── */}
        <div className="bg-[#0C1E35] rounded-xl px-8 py-5 mb-10
                        grid grid-cols-4 divide-x divide-white/10">
          {STATS.map(({ n, l }) => (
            <div key={l} className="text-center px-4">
              <div className="text-2xl font-black text-[#E8820C]">{n}</div>
              <div className="text-[11px] text-white/50 uppercase tracking-wider mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* ── Section heading ── */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">Why Trade on Ecom.lk?</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sri Lanka's most trusted B2B trade platform since 2010
          </p>
        </div>

        {/* ── Feature cards grid ── */}
        <div className="grid grid-cols-4 gap-5">
          {FEATURES.map(({ icon, title, body, cta, border, iconBg, ctaColor }) => (
            <div key={title}
              className={`bg-white rounded-xl p-6 border-t-4 ${border}
                          shadow-sm hover:shadow-md transition-shadow`}>

              {/* Icon */}
              <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center
                               justify-center text-2xl mb-4 flex-shrink-0`}>
                {icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-[14px] mb-2 leading-snug">
                {title}
              </h3>

              {/* Body */}
              <p className="text-[12px] text-gray-500 leading-relaxed mb-4">{body}</p>

              {/* CTA link */}
              <a href="#" className={`${ctaColor} text-[12px] font-semibold transition-colors`}>
                {cta} →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
