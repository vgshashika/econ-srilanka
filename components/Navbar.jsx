"use client";
// ─── Navbar Component (Milestone 02 redesign) ─────────────────────────────────
// Reference: Made-in-China.com top nav
// White background · left: All Categories · center: main links · right: role dropdowns
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import MegaMenu from "./MegaMenu";

const CENTER_LINKS = [
  { label: "AI Sourcing",       href: "/products",        hot: true  },
  { label: "Trade Assurance",   href: "/how-it-works",    hot: false },
  { label: "Video Channel",     href: "/trade-shows",     hot: false },
  { label: "Top-ranked Exports",href: "/suppliers",       hot: false },
];

const RIGHT_DROPDOWNS = [
  { label: "Supplier", href: "/suppliers" },
  { label: "Buyer", href: "/rfq" },
  { label: "Help", href: "/faq" },
  { label: "Apps", href: "/how-it-works" },
  { label: "English", href: "/" },
];

function ChevronDown({ open }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      className={`h-3 w-3 ml-0.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("");

  return (
    <nav className="bg-white border-b border-gray-200 relative z-40">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center h-11">

          {/* ── All Categories trigger ── */}
          <div
            className="relative flex-shrink-0 h-full flex items-center"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 h-full px-4 text-sm font-semibold
                          transition-colors border-r border-gray-200
                          ${menuOpen
                            ? "bg-[#E8820C] text-white"
                            : "text-gray-800 hover:bg-gray-50"}`}>
              {/* hamburger */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <span>All Categories</span>
              <ChevronDown open={menuOpen}/>
            </button>

            {menuOpen && <MegaMenu />}
          </div>

          {/* ── Center links ── */}
          <div className="flex items-center h-full ml-1">
            {CENTER_LINKS.map(({ label, href, hot }) => (
              <Link key={label} href={href}
                onClick={() => setActive(label)}
                className={`relative h-full flex items-center px-4 text-sm
                            transition-colors whitespace-nowrap
                            ${active === label
                              ? "text-[#E8820C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E8820C]"
                              : "text-gray-700 hover:text-[#E8820C]"}`}>
                {label}
                {hot && (
                  <span className="ml-1.5 bg-red-500 text-white text-[9px] font-bold
                                   px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    AI
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* ── Right dropdowns ── */}
          <div className="ml-auto flex items-center h-full">
            {RIGHT_DROPDOWNS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-0.5 h-full px-3 text-[13px]
                           text-gray-600 hover:text-[#E8820C] transition-colors
                           whitespace-nowrap border-l border-gray-100 first:border-0"
              >
                {label}
                <ChevronDown open={false}/>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}
