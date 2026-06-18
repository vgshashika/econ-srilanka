import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const STATS = [
  { n: "10,000+", l: "Verified Suppliers" },
  { n: "50,000+", l: "Products Listed" },
  { n: "120+",    l: "Export Countries" },
  { n: "2010",    l: "Year Founded" },
];
const VALUES = [
  { icon: "🤝", title: "Trust",         body: "Every supplier is verified before listing. We stand behind every transaction on the platform." },
  { icon: "🌿", title: "Sustainability",body: "We actively promote Sri Lanka's heritage of ethical, eco-friendly production methods." },
  { icon: "🚀", title: "Growth",        body: "We help small and medium exporters reach global markets they couldn't access alone." },
  { icon: "🔒", title: "Security",      body: "Trade Assurance protects every buyer's payment until delivery is confirmed and approved." },
];
const TEAM = [
  { name: "Roshan Perera",       role: "CEO & Co-Founder",       emoji: "👨‍💼" },
  { name: "Sithara Fernando",    role: "Chief Technology Officer",emoji: "👩‍💻" },
  { name: "Amal Jayawardena",    role: "Head of Trade Services",  emoji: "👨‍⚖️" },
  { name: "Priya Wickramasinghe",role: "Marketing Director",      emoji: "👩‍🎨" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <div className="py-20 text-white text-center px-4"
        style={{ background: "linear-gradient(135deg,#0C1E35 0%,#1E3A5F 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl font-black mb-4">
            Ecom<span style={{ color: "#E8820C" }}>Lanka</span>
          </div>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            Sri Lanka's premier B2B export marketplace — connecting the island's finest suppliers
            with global buyers since 2010.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="py-8" style={{ background: "#E8820C" }}>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {STATS.map(({ n, l }) => (
            <div key={l}>
              <div className="text-3xl font-black">{n}</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.85)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#0C1E35" }}>Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EcomLanka was founded with a single purpose: to make it easier for Sri Lanka's
              world-class exporters — tea estates, gem dealers, spice farms, textile weavers,
              and artisan collectives — to reach buyers anywhere on earth.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We built the platform that Sri Lankan small and medium exporters deserve —
              transparent, secure, and built for professional B2B trade at scale.
            </p>
            <Link href="/how-it-works"
              className="inline-block px-5 py-2.5 rounded-xl text-white text-sm font-bold"
              style={{ background: "#E8820C" }}>
              How It Works →
            </Link>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-4">
            {VALUES.map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#0C1E35" }}>{title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16" style={{ background: "#F5F7FA" }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-center mb-10" style={{ color: "#0C1E35" }}>
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, emoji }) => (
              <div key={name} className="bg-white rounded-2xl p-5 text-center border border-gray-100"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="text-5xl mb-3">{emoji}</div>
                <div className="font-bold text-sm" style={{ color: "#0C1E35" }}>{name}</div>
                <div className="text-xs text-gray-500 mt-1">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 text-center px-4" style={{ background: "#0C1E35" }}>
        <h2 className="text-2xl font-black text-white mb-3">Ready to trade with Sri Lanka?</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          Join 10,000+ verified suppliers and global buyers on EcomLanka.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products"
            className="px-6 py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: "#E8820C" }}>
            Browse Products
          </Link>
          <Link href="/login?tab=register"
            className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-white text-white">
            Register Free
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
