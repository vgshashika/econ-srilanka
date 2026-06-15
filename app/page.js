// ─── Milestone 01 – Desktop Homepage ───────────────────────────────────────
// Layout:  Header → Navbar → [Sidebar | Hero] → Products → FeatureCards → Footer
// All components are in /components/

import Header            from "@/components/Header";
import Navbar            from "@/components/Navbar";
import CategorySidebar   from "@/components/CategorySidebar";
import HeroBanner        from "@/components/HeroBanner";
import RecommendedProducts from "@/components/RecommendedProducts";
import FeatureCards      from "@/components/FeatureCards";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* ── 1. Site Header (logo + search + account icons) ── */}
      <Header />

      {/* ── 2. Main Navigation Bar ── */}
      <Navbar />

      {/* ── 3. Sidebar + Hero Banner side-by-side ── */}
      <div className="max-w-[1280px] mx-auto px-4 pt-4 pb-3">
        <div className="flex gap-4 items-stretch">
          {/* Left: fixed-width category sidebar */}
          <CategorySidebar />

          {/* Right: hero slider + promo cards */}
          <HeroBanner />
        </div>
      </div>

      {/* ── 4. Recommended Products Grid ── */}
      <div className="max-w-[1280px] mx-auto px-4 pb-8">
        <RecommendedProducts />
      </div>

      {/* ── 5. Why Trade on Ecom.lk? ── */}
      <FeatureCards />

      {/* ── 6. Simple Footer ── */}
      <footer className="bg-[#0C1E35] text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-8">

          {/* Footer top row */}
          <div className="flex items-start justify-between gap-8 pb-6 border-b border-white/10 mb-6">

            {/* Brand */}
            <div className="min-w-[180px]">
              <div className="text-2xl font-black tracking-tight">
                Ecom<span className="text-[#E8820C]">.lk</span>
              </div>
              <div className="text-white/40 text-[11px] tracking-widest mt-0.5 uppercase">
                Made in Sri Lanka 🇱🇰
              </div>
              <p className="text-white/50 text-xs mt-3 leading-relaxed max-w-[220px]">
                Sri Lanka's leading B2B export marketplace connecting buyers worldwide with verified local suppliers.
              </p>
            </div>

            {/* Footer links */}
            <div className="flex gap-12 text-sm">
              <div>
                <div className="text-white/70 font-semibold mb-3">Marketplace</div>
                <ul className="space-y-2 text-white/40">
                  {["Products", "Suppliers", "Buyers", "Trade Shows"].map((l) => (
                    <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-white/70 font-semibold mb-3">Categories</div>
                <ul className="space-y-2 text-white/40">
                  {["Ceylon Tea", "Gems & Jewelry", "Textiles", "Spices & Food"].map((l) => (
                    <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-white/70 font-semibold mb-3">Company</div>
                <ul className="space-y-2 text-white/40">
                  {["About Us", "Careers", "Press", "Contact"].map((l) => (
                    <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-white/70 font-semibold mb-3">Support</div>
                <ul className="space-y-2 text-white/40">
                  {["Help Center", "Trade Assurance", "Report Dispute", "Sitemap"].map((l) => (
                    <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex items-center justify-between text-white/30 text-xs">
            <p>© 2025 Ecom.lk – Sri Lanka's Premier B2B Marketplace. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/60">Terms of Service</a>
              <a href="#" className="hover:text-white/60">Privacy Policy</a>
              <a href="#" className="hover:text-white/60">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
