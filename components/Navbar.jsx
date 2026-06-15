"use client";
// ─── Navbar Component ─────────────────────────────────────────────────────────
// Full-width dark navigation bar with:
//   • "All Categories" dropdown trigger (orange, left-most)
//   • Primary nav links
//   • Right-side quick access links
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home",        href: "/" },
  { label: "Products",    href: "/products" },
  { label: "Suppliers",   href: "/suppliers" },
  { label: "Buyers",      href: "/buyers" },
  { label: "Trade Shows", href: "/trade-shows" },
  { label: "Industries",  href: "/industries" },
  { label: "Help",        href: "/help" },
];

// Hamburger / menu icon
function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

// Chevron down
function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <nav className="bg-[#0C1E35] text-white border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center">

          {/* ── All Categories button (orange pill, left anchor) ── */}
          <button
            className="flex items-center gap-2 bg-[#E8820C] hover:bg-[#d4740a]
                       px-4 py-3 text-sm font-semibold transition-colors flex-shrink-0">
            <MenuIcon />
            <span>All Categories</span>
            <ChevronDown />
          </button>

          {/* ── Primary navigation links ── */}
          <div className="flex items-center ml-2">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link key={label} href={href}
                onClick={() => setActive(label)}
                className={[
                  "px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap",
                  "hover:bg-white/10 hover:text-white",
                  active === label
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E8820C]"
                    : "text-white/70",
                ].join(" ")}>
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right-side quick access ── */}
          <div className="ml-auto flex items-center gap-5 text-sm text-white/60">
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#E8820C] transition-colors">
              <span className="text-base">🔥</span>
              <span>Hot Deals</span>
            </Link>
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#E8820C] transition-colors">
              <span className="text-base">✅</span>
              <span>Verified Suppliers</span>
            </Link>
            <Link href="#" className="flex items-center gap-1.5 hover:text-[#E8820C] transition-colors">
              <span className="text-base">🚢</span>
              <span>Export Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
