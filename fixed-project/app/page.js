// ─── Homepage ─────────────────────────────────────────────────────────────────
import Header              from "@/components/Header";
import Navbar              from "@/components/Navbar";
import CategorySidebar     from "@/components/CategorySidebar";
import HeroBanner          from "@/components/HeroBanner";
import InfoCards           from "@/components/InfoCards";
import YouMayLike          from "@/components/YouMayLike";
import FloatingBar         from "@/components/FloatingBar";
import RecommendedProducts from "@/components/RecommendedProducts";
import FeatureCards        from "@/components/FeatureCards";
import Footer              from "@/components/Footer";

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

      {/* 6 ── Footer (shared component) */}
      <Footer />

      {/* 7 ── Floating right bar */}
      <FloatingBar />

    </div>
  );
}
