"use client";
import { useState } from "react";
import Link from "next/link";

const FOOTER_LINKS = {
  "Trade Hub": [
    { label: "Browse Products",   href: "/products" },
    { label: "Find Suppliers",    href: "/suppliers" },
    { label: "Post an RFQ",       href: "/rfq" },
    { label: "Trade Shows",       href: "/trade-shows" },
    { label: "Verified Suppliers",href: "/suppliers?badge=verified" },
  ],
  "Categories": [
    { label: "Ceylon Tea",        href: "/categories/ceylon-tea" },
    { label: "Gems & Jewelry",    href: "/categories/gems-jewelry" },
    { label: "Spices & Herbs",    href: "/categories/spices-agriculture" },
    { label: "Apparel & Textiles",href: "/categories/apparel-textiles" },
    { label: "Coconut Products",  href: "/categories/coconut-products" },
    { label: "Handicrafts & Arts",href: "/categories/handicrafts-arts" },
  ],
  "Sellers": [
    { label: "Start Selling",     href: "/login?tab=register" },
    { label: "Seller Dashboard",  href: "/dashboard" },
    { label: "Manage Products",   href: "/products" },
    { label: "Manage RFQs",       href: "/rfq" },
    { label: "Seller Guide",      href: "/how-it-works" },
  ],
  "Help & Info": [
    { label: "About Us",          href: "/about" },
    { label: "Contact Us",        href: "/contact" },
    { label: "How It Works",      href: "/how-it-works" },
    { label: "FAQ",               href: "/faq" },
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
  ],
};

const CERTIFICATIONS = ["🇱🇰 Sri Lanka EDB", "ISO 9001", "SLSI", "EDB Verified"];

const PAYMENT_METHODS = ["💳 Visa", "💳 Mastercard", "🏦 Bank Transfer", "📄 L/C", "💰 PayPal"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    try {
      // Stubbed for now until backend endpoint is ready.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubscribed(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <footer style={{ background: "#0C1E35" }} className="text-white">
      {/* Top bar */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "#0a1a2e" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl font-black"
                  style={{ background: "#E8820C" }}
                >
                  🇱🇰
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight">
                    <span style={{ color: "#E8820C" }}>Ecom</span>
                    <span className="text-white">Lanka</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Sri Lanka's B2B Export Marketplace
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full md:w-auto">
              <p className="text-sm font-semibold mb-2 text-white">
                Get trade insights & new supplier alerts
              </p>
              {subscribed ? (
                <p className="text-sm" style={{ color: "#E8820C" }}>
                  ✅ You're subscribed!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email"
                      required
                      className="px-4 py-2 rounded-lg text-sm text-gray-900 bg-white w-64 focus:outline-none focus:ring-2"
                      style={{ focusRingColor: "#E8820C" }}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ background: "#E8820C", color: "white" }}
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs" style={{ color: "#FCA5A5" }}>
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{ color: "#E8820C" }}
              >
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => (e.target.style.color = "#E8820C")}
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgba(255,255,255,0.65)")
                      }
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="mt-12 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {[
            { num: "12,000+", label: "Products Listed" },
            { num: "2,400+", label: "Verified Suppliers" },
            { num: "80+",     label: "Export Destinations" },
            { num: "35,000+", label: "Registered Buyers" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-2xl font-black"
                style={{ color: "#E8820C" }}
              >
                {s.num}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Payment */}
        <div
          className="mt-8 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Platform Certifications
            </p>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((c) => (
                <span
                  key={c}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Payment Methods
            </p>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((p) => (
                <span
                  key={p}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            © {new Date().getFullYear()} EcomLanka. All rights reserved.
            powered by techromzIT
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs transition-colors duration-150"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.target.style.color = "#E8820C")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.4)")
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
