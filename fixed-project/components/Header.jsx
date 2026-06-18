"use client";
// ─── Header Component (Milestone 02 redesign) ─────────────────────────────────
// Reference layout: Made-in-China.com header
// White background · pill-shaped search · camera icon · Post RFQ / icons right
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";

const SEARCH_CATS = ["Products","Suppliers","Ceylon Tea","Gems & Jewelry",
  "Spices","Apparel","Handicrafts","Seafood"];

/* ── SVG icons (inline, no library needed) ── */
const Icon = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  camera: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  rfq: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  ),
  message: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
  basket: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
    </svg>
  ),
  person: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
};

export default function Header() {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("Products");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-[26px] font-black tracking-tight text-[#0C1E35]">
              Ecom<span className="text-[#E8820C]">.lk</span>
            </span>
            <span className="text-[9px] text-gray-400 tracking-[0.18em] uppercase mt-0.5">
              Made in Sri Lanka
            </span>
          </div>
        </Link>

        {/* ── Pill-shaped search bar ── */}
        <div className="flex-1 max-w-[600px]">
          <div className="flex items-center border-2 border-[#E8820C] rounded-full
                          overflow-hidden focus-within:shadow-md
                          focus-within:shadow-orange-100 transition-shadow">

            {/* Category dropdown */}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="pl-4 pr-2 py-2.5 bg-transparent text-sm text-gray-700
                         focus:outline-none border-r border-gray-200 cursor-pointer
                         min-w-[110px]">
              {SEARCH_CATS.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Text input */}
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter a keyword to search products"
              className="flex-1 px-4 py-2.5 text-sm text-gray-800 focus:outline-none
                         placeholder-gray-400 min-w-0"
            />

            {/* Camera icon */}
            <button className="px-3 text-gray-400 hover:text-[#E8820C]
                               transition-colors flex-shrink-0 border-l border-gray-200">
              {Icon.camera}
            </button>

            {/* Search button */}
            <button className="bg-[#E8820C] hover:bg-[#d4740a] text-white w-12 h-full
                               flex items-center justify-center flex-shrink-0
                               rounded-full -mr-0.5 transition-colors py-2.5">
              {Icon.search}
            </button>
          </div>

          {/* Trending searches */}
          <div className="flex items-center gap-2 mt-1.5 px-4 text-[11px] text-gray-400">
            <span>Trending:</span>
            {["Ceylon Tea","Blue Sapphire","Cinnamon","Batik","Coconut Oil"].map(t => (
              <button key={t} type="button"
                className="hover:text-[#E8820C] hover:underline underline-offset-2 transition-colors">
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right icons ── */}
        <div className="flex items-center gap-5 flex-shrink-0">

          {/* Post My RFQ – highlighted */}
          <Link href="#"
            className="flex flex-col items-center text-[#E8820C] hover:text-[#d4740a]
                       transition-colors cursor-pointer">
            {Icon.rfq}
            <span className="text-[11px] font-semibold mt-0.5 whitespace-nowrap">Post My RFQ</span>
          </Link>

          {/* Messages */}
          <button className="flex flex-col items-center text-gray-600
                             hover:text-[#E8820C] transition-colors">
            {Icon.message}
            <span className="text-[11px] mt-0.5">Messages</span>
          </button>

          {/* Inquiry Basket */}
          <button className="flex flex-col items-center text-gray-600
                             hover:text-[#E8820C] transition-colors relative">
            {Icon.basket}
            <span className="text-[11px] mt-0.5 whitespace-nowrap">Inquiry Basket</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px]
                             rounded-full w-4 h-4 flex items-center justify-center font-bold">
              0
            </span>
          </button>

          {/* Sign in */}
          <button className="flex flex-col items-center text-gray-600
                             hover:text-[#E8820C] transition-colors">
            {Icon.person}
            <span className="text-[11px] mt-0.5">Sign in</span>
          </button>
        </div>
      </div>
    </header>
  );
}
