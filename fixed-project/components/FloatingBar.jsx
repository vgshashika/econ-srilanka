// ─── FloatingBar Component ────────────────────────────────────────────────────
// Reference: Made-in-China right-edge floating action bar
// Fixed to right side · RFQ / Help / App icons stacked vertically
// ─────────────────────────────────────────────────────────────────────────────

const ACTIONS = [
  {
    label: "RFQ",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    label: "Help",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    label: "App",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
    ),
  },
];

export default function FloatingBar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col shadow-lg">
      {ACTIONS.map(({ label, icon }) => (
        <button key={label}
          className="flex flex-col items-center justify-center gap-1 w-12 py-3
                     bg-white border border-gray-200 text-gray-600
                     hover:bg-[#E8820C] hover:text-white hover:border-[#E8820C]
                     transition-colors first:rounded-tl-lg last:rounded-bl-lg
                     border-t-0 first:border-t">
          {icon}
          <span className="text-[9px] font-semibold uppercase tracking-wide leading-none">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
