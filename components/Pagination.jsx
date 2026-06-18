"use client";

export default function Pagination({ current = 1, total = 1, onChange }) {
  if (total <= 1) return null;

  function pages() {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }
    if (total > 1) range.push(total);

    for (let i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l > 2) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }

  const btn = (label, page, disabled = false) => (
    <button
      key={label}
      onClick={() => !disabled && onChange && onChange(page)}
      disabled={disabled}
      className="min-w-[2.25rem] h-9 px-3 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      style={
        page === current && label !== "..." && label !== "‹" && label !== "›"
          ? { background: "#E8820C", color: "white", boxShadow: "0 2px 8px rgba(232,130,12,0.3)" }
          : { background: "white", color: "#374151", border: "1px solid #E5E7EB" }
      }
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap mt-8">
      {btn("‹", current - 1, current === 1)}
      {pages().map((p, i) =>
        p === "..."
          ? <span key={`dots-${i}`} className="px-2 text-gray-400 select-none">…</span>
          : btn(p, p)
      )}
      {btn("›", current + 1, current === total)}
    </div>
  );
}
