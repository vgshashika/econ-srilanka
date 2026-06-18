"use client";
// ─── YouMayLike Component ─────────────────────────────────────────────────────
// Reference: Made-in-China right panel "You May Like"
// Small product thumbnail + name · "Post Your Request" CTA at bottom
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { name: "Blue Sapphire Gem",     emoji: "💎", bg: "bg-blue-100"    },
  { name: "Ceylon Loose Leaf Tea", emoji: "🫖", bg: "bg-emerald-100" },
  { name: "Organic Cinnamon",      emoji: "🌿", bg: "bg-amber-100"   },
  { name: "Handloom Batik Fabric", emoji: "🧵", bg: "bg-purple-100"  },
  { name: "Virgin Coconut Oil",    emoji: "🥥", bg: "bg-lime-100"    },
  { name: "Moonstone Pendant",     emoji: "🔮", bg: "bg-slate-100"   },
];

export default function YouMayLike() {
  return (
    <aside className="w-[210px] flex-shrink-0 bg-white border border-gray-200
                      flex flex-col">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-bold text-[15px] text-gray-800">You May Like</h3>
      </div>

      {/* Product list */}
      <ul className="flex-1 divide-y divide-gray-100">
        {PRODUCTS.map(({ name, emoji, bg }) => (
          <li key={name}>
            <button className="w-full flex items-center gap-3 px-3 py-3
                               hover:bg-gray-50 transition-colors text-left">
              {/* Thumbnail */}
              <div className={`${bg} w-12 h-12 rounded-lg flex items-center
                               justify-center text-2xl flex-shrink-0`}>
                {emoji}
              </div>
              {/* Name */}
              <span className="text-[12px] text-gray-700 leading-tight line-clamp-2">
                {name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 p-3 space-y-2">
        <p className="text-[11px] text-gray-400 text-center">
          No desirable products?
        </p>
        <button
          className="w-full border border-[#E8820C] text-[#E8820C]
                     hover:bg-[#E8820C] hover:text-white transition-colors
                     text-[12px] font-semibold py-2 rounded-lg flex items-center
                     justify-center gap-1.5">
          {/* RFQ icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Post Your Request Now
        </button>
      </div>
    </aside>
  );
}
