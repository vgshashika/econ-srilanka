"use client";
// ─── Header Component ─────────────────────────────────────────────────────────
// Renders:
//   1. Top utility bar  – language, help, login, register
//   2. Main header row  – logo | search (category + input + button) | user icons
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";

// Drop-down options inside the search box
const SEARCH_CATEGORIES = [
  "All Categories",
  "Ceylon Tea",
  "Gems & Jewelry",
  "Spices & Food",
  "Apparel & Textiles",
  "Agriculture",
  "Handicrafts",
  "Seafood",
  "Wood & Furniture",
  "Electronics",
];

// Top utility bar quick links
const UTILITY_LINKS = ["Help Center", "Trade Shows", "Download App", "For Suppliers"];

// Cart icon (inline SVG – no dependency)
function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

// Account / person icon
function AccountIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

// Heart / favourites icon
function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

export default function Header() {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("All Categories");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Route to /search?q=query&cat=category  (Milestone 02+)
    alert(`Searching for "${query}" in "${category}"`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

      {/* ── Top utility bar ── */}
      <div className="bg-[#0C1E35] text-white text-xs py-1.5">
        <div className="max-w-[1280px] mx-auto px-4 flex justify-between items-center">

          {/* Left: brand tagline */}
          <span className="text-white/60 tracking-wide">
            🇱🇰 &nbsp;Sri Lanka's #1 B2B Export Marketplace
          </span>

          {/* Right: utility links + auth */}
          <div className="flex items-center gap-5 text-white/70">
            {UTILITY_LINKS.map((link) => (
              <Link key={link} href="#"
                className="hover:text-white hover:underline underline-offset-2 transition-colors">
                {link}
              </Link>
            ))}

            <span className="text-white/20">|</span>

            <Link href="#" className="hover:text-[#E8820C] font-medium transition-colors">
              Sign In
            </Link>
            <Link href="#"
              className="bg-[#E8820C] hover:bg-[#d4740a] text-white px-3 py-0.5 rounded font-medium transition-colors">
              Register Free
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main header row ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex-shrink-0 mr-2">
          <div className="flex flex-col leading-none">
            <span className="text-3xl font-black tracking-tight text-[#0C1E35]">
              Ecom<span className="text-[#E8820C]">.lk</span>
            </span>
            <span className="text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-0.5">
              Made in Sri Lanka
            </span>
          </div>
        </Link>

        {/* ── Search bar ── */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="flex border-2 border-[#E8820C] rounded-lg overflow-hidden focus-within:shadow-md focus-within:shadow-orange-100 transition-shadow">

            {/* Category dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-sm text-gray-700
                         focus:outline-none cursor-pointer min-w-[150px]">
              {SEARCH_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            {/* Text input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, suppliers, categories..."
              className="flex-1 px-4 py-2.5 text-sm text-gray-800 focus:outline-none placeholder-gray-400"
            />

            {/* Search button */}
            <button type="submit"
              className="bg-[#E8820C] hover:bg-[#d4740a] text-white px-7 py-2.5
                         text-sm font-semibold transition-colors flex-shrink-0">
              Search
            </button>
          </div>

          {/* Trending tags */}
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
            <span>Trending:</span>
            {["Ceylon Tea", "Blue Sapphire", "Cinnamon", "Batik Fabric", "Coconut Oil"].map((t) => (
              <button key={t} type="button"
                className="hover:text-[#E8820C] hover:underline underline-offset-2 transition-colors">
                {t}
              </button>
            ))}
          </div>
        </form>

        {/* ── Right action buttons ── */}
        <div className="flex items-center gap-4 ml-2 flex-shrink-0">

          {/* Post product CTA */}
          <Link href="#"
            className="border-2 border-[#E8820C] text-[#E8820C] hover:bg-[#E8820C] hover:text-white
                       px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
            + Post Product
          </Link>

          {/* Icon group */}
          {[
            { icon: <HeartIcon />, label: "Saved",   href: "#" },
            { icon: <CartIcon />,  label: "Cart",    href: "#", badge: 3 },
            { icon: <AccountIcon />, label: "Account", href: "#" },
          ].map(({ icon, label, href, badge }) => (
            <Link key={label} href={href}
              className="flex flex-col items-center text-gray-500 hover:text-[#E8820C]
                         transition-colors relative cursor-pointer group">
              <span className="group-hover:scale-110 transition-transform">{icon}</span>
              <span className="text-[10px] mt-0.5 font-medium">{label}</span>
              {badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px]
                                 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
