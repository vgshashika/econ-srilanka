"use client";
import { useState } from "react";
import { CATEGORIES, CERTIFICATIONS, LOCATIONS } from "@/lib/data";

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-bold mb-3"
        style={{ color: "#0C1E35" }}
      >
        {title}
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && children}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onReset }) {
  const {
    categories = [],
    locations  = [],
    certs      = [],
    minPrice   = "",
    maxPrice   = "",
    rating     = 0,
    inStock    = false,
  } = filters;

  function toggle(key, value) {
    const arr = filters[key] || [];
    onChange({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  }

  return (
    <aside
      className="bg-white rounded-2xl p-5 sticky top-24"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-base" style={{ color: "#0C1E35" }}>
          🔍 Filters
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold underline"
          style={{ color: "#E8820C" }}
        >
          Reset All
        </button>
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.includes(c.slug)}
                onChange={() => toggle("categories", c.slug)}
                className="w-4 h-4 rounded accent-orange-500"
              />
              <span className="text-xs flex-1 group-hover:text-orange-600 transition-colors" style={{ color: "#374151" }}>
                {c.emoji} {c.name}
              </span>
              <span className="text-xs text-gray-400">({c.count})</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range (USD)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2"
            style={{ focusRingColor: "#E8820C" }}
          />
          <span className="text-gray-400 text-xs">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2"
          />
        </div>
      </Section>

      {/* Location */}
      <Section title="Supplier Location" defaultOpen={false}>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {LOCATIONS.map((loc) => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={locations.includes(loc)}
                onChange={() => toggle("locations", loc)}
                className="w-4 h-4 rounded accent-orange-500"
              />
              <span className="text-xs group-hover:text-orange-600 transition-colors" style={{ color: "#374151" }}>
                📍 {loc}
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section title="Certifications" defaultOpen={false}>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {CERTIFICATIONS.map((cert) => (
            <label key={cert} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={certs.includes(cert)}
                onChange={() => toggle("certs", cert)}
                className="w-4 h-4 rounded accent-orange-500"
              />
              <span className="text-xs group-hover:text-orange-600 transition-colors" style={{ color: "#374151" }}>
                🏅 {cert}
              </span>
            </label>
          ))}
        </div>
      </Section>

      {/* Min Rating */}
      <Section title="Minimum Rating" defaultOpen={false}>
        <div className="flex gap-2">
          {[4.5, 4.0, 3.5, 0].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, rating: r })}
              className="flex-1 text-xs py-1.5 rounded-lg border font-medium transition-all"
              style={
                rating === r
                  ? { background: "#E8820C", color: "white", border: "1px solid #E8820C" }
                  : { border: "1px solid #E5E7EB", color: "#374151" }
              }
            >
              {r === 0 ? "All" : `${r}⭐`}
            </button>
          ))}
        </div>
      </Section>

      {/* In Stock */}
      <Section title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
            className="w-4 h-4 rounded accent-orange-500"
          />
          <span className="text-xs font-medium" style={{ color: "#374151" }}>
            In Stock Only
          </span>
        </label>
      </Section>
    </aside>
  );
}
