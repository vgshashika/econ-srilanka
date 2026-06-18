// ─── InfoCards Component ───────────────────────────────────────────────────────
// Reference: 4 cards below the hero (SMART EXPO / Secured Trading / Leading Factory / Selected Supplier)
// Sri Lanka adaptation: Export Fair · Trade Assurance · Leading Exporter · Selected Supplier
// ─────────────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    title: "EXPORT EXPO",
    sub:   "2025 Sri Lanka Trade Fair",
    emoji: "🏛️",
    bg:    "bg-[#1E3A5F]",
    text:  "text-white",
  },
  {
    title: "Trade Assurance",
    sub:   "Secured payment protection",
    emoji: "🔒",
    bg:    "bg-orange-50",
    text:  "text-gray-800",
    border: "border border-orange-100",
  },
  {
    title: "Leading Exporter",
    sub:   "Verified top-tier suppliers",
    emoji: "🏆",
    bg:    "bg-emerald-50",
    text:  "text-gray-800",
    border: "border border-emerald-100",
  },
  {
    title: "Selected Supplier",
    sub:   "Hand-picked quality partners",
    emoji: "✅",
    bg:    "bg-blue-50",
    text:  "text-gray-800",
    border: "border border-blue-100",
  },
];

export default function InfoCards() {
  return (
    <div className="grid grid-cols-4 gap-0 border-t border-gray-200">
      {CARDS.map(({ title, sub, emoji, bg, text, border = "" }) => (
        <div key={title}
          className={`${bg} ${text} ${border} flex items-center gap-3
                      px-4 py-4 cursor-pointer hover:brightness-95
                      transition-all border-r border-gray-200 last:border-0`}>
          <span className="text-4xl flex-shrink-0">{emoji}</span>
          <div>
            <div className="font-bold text-[13px] leading-tight">{title}</div>
            <div className={`text-[11px] mt-0.5 ${text === "text-white" ? "text-white/70" : "text-gray-500"}`}>
              {sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
