// ─── Homepage — Milestone 02 (3-column layout) ────────────────────────────────
// Layout matches Made-in-China.com reference:
//
//   [Header]
//   [Navbar]
//   ┌──────────────────────────────────────────────────────┐
//   │ [CategorySidebar] │ [HeroBanner + InfoCards] │ [YouMayLike] │
//   └──────────────────────────────────────────────────────┘
//   [RecommendedProducts]
//   [FeatureCards]
//   [Footer]
//   [FloatingBar] ← fixed right edge
// ─────────────────────────────────────────────────────────────────────────────

import Header              from "@/components/Header";
import Navbar              from "@/components/Navbar";
import CategorySidebar     from "@/components/CategorySidebar";
import HeroBanner          from "@/components/HeroBanner";
import InfoCards           from "@/components/InfoCards";
import YouMayLike          from "@/components/YouMayLike";
import FloatingBar         from "@/components/FloatingBar";
import RecommendedProducts from "@/components/RecommendedProducts";
import FeatureCards        from "@/components/FeatureCards";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* 1 ── Header */}
      <Header />

      {/* 2 ── Navbar */}
      <Navbar />

      {/* 3 ── 3-column hero section */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto flex">

          {/* Col A: Category sidebar */}
          <CategorySidebar />

          {/* Col B: Hero slider + info cards stacked */}
          <div className="flex-1 flex flex-col border-l border-r border-gray-200">
            <HeroBanner />
            <InfoCards />
          </div>

          {/* Col C: You May Like */}
          <YouMayLike />
        </div>
      </div>

      {/* 4 ── Recommended Products */}
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <RecommendedProducts />
      </div>

      {/* 5 ── Feature / Trust cards */}
      <FeatureCards />

      {/* 6 ── Footer */}
      <footer className="bg-[#0C1E35] text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <div className="flex items-start justify-between gap-8 pb-6
                          border-b border-white/10 mb-6">
            <div>
              <div className="text-2xl font-black">
                Ecom<span className="text-[#E8820C]">.lk</span>
              </div>
              <div className="text-white/40 text-[10px] tracking-widest mt-1 uppercase">
                Made in Sri Lanka 🇱🇰
              </div>
              <p className="text-white/50 text-xs mt-3 leading-relaxed max-w-[220px]">
                Sri Lanka's leading B2B export marketplace.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              {[
                ["Marketplace", ["Products","Suppliers","Buyers","Trade Shows"]],
                ["Categories",  ["Ceylon Tea","Gems & Jewelry","Textiles","Spices"]],
                ["Company",     ["About Us","Careers","Press","Contact"]],
                ["Support",     ["Help Center","Trade Assurance","Sitemap","Report"]],
              ].map(([heading, links]) => (
                <div key={heading}>
                  <div className="text-white/70 font-semibold mb-3">{heading}</div>
                  <ul className="space-y-2 text-white/40">
                    {links.map(l => (
                      <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-white/30 text-xs">
            <p>© 2025 Ecom.lk. All Rights Reserved.</p>
            <div className="flex gap-4">
              {["Terms","Privacy","Cookies"].map(l => (
                <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* 7 ── Floating right bar */}
      <FloatingBar />

    </div>
  );
}
