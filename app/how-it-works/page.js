import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const BUYER_STEPS = [
  { n:"01", icon:"🔍", title:"Search & Discover",    body:"Browse 50,000+ products from verified Sri Lankan exporters. Use filters for category, price, certifications, and location." },
  { n:"02", icon:"💬", title:"Send an Inquiry",       body:"Click 'Inquire' on any product or add multiple items to your Inquiry Basket and send a bulk request to all suppliers at once." },
  { n:"03", icon:"📋", title:"Receive Quotes",         body:"Suppliers respond within 24–48 hours with pricing, lead times, and sample options. Compare all quotes in your dashboard." },
  { n:"04", icon:"🤝", title:"Negotiate & Agree",     body:"Chat directly with your chosen supplier, request samples, and finalise order specifications, packaging, and delivery terms." },
  { n:"05", icon:"🔒", title:"Pay Safely",            body:"Send payment via Trade Assurance. Funds are held in escrow and only released when you confirm receipt and quality." },
  { n:"06", icon:"🚢", title:"Receive Your Order",    body:"Goods are shipped with full customs documentation. Track your shipment and leave a review to help the community." },
];

const SELLER_STEPS = [
  { n:"01", icon:"📝", title:"Register as Supplier", body:"Create your free account, choose the Supplier role, and fill in your company profile with certifications and export capacity." },
  { n:"02", icon:"📦", title:"List Your Products",   body:"Upload products with photos, specifications, certifications, and pricing. Our team verifies your listing before it goes live." },
  { n:"03", icon:"📬", title:"Receive Inquiries",    body:"Global buyers send you inquiries directly. Respond quickly with your best quote to stand out from competitors." },
  { n:"04", icon:"💰", title:"Get Paid Safely",      body:"Payment is secured through Trade Assurance. Once the buyer confirms delivery, funds are released to you within 3–5 days." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <div className="py-16 text-center px-4"
        style={{ background: "linear-gradient(135deg,#0C1E35,#1E3A5F)" }}>
        <h1 className="text-3xl font-black text-white mb-3">How EcomLanka Works</h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
          Whether you're a global buyer sourcing Sri Lankan products or a local supplier
          looking to export — here's exactly how it works.
        </p>
      </div>

      {/* Buyer flow */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg font-black"
            style={{ background: "#E8820C" }}>🌍</div>
          <h2 className="text-2xl font-black" style={{ color: "#0C1E35" }}>For Buyers</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BUYER_STEPS.map(({ n, icon, title, body }) => (
            <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{icon}</span>
                <span className="text-xs font-black" style={{ color: "#E8820C" }}>STEP {n}</span>
              </div>
              <h3 className="font-black text-sm mb-2" style={{ color: "#0C1E35" }}>{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products"
            className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: "#E8820C" }}>
            Start Browsing Products →
          </Link>
        </div>
      </div>

      {/* Seller flow */}
      <div className="py-16" style={{ background: "#F5F7FA" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg font-black"
              style={{ background: "#0C1E35" }}>🇱🇰</div>
            <h2 className="text-2xl font-black" style={{ color: "#0C1E35" }}>For Suppliers</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {SELLER_STEPS.map(({ n, icon, title, body }) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-xs font-black" style={{ color: "#E8820C" }}>STEP {n}</span>
                </div>
                <h3 className="font-black text-sm mb-2" style={{ color: "#0C1E35" }}>{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/login?tab=register&role=seller"
              className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: "#0C1E35" }}>
              Start Selling on EcomLanka →
            </Link>
          </div>
        </div>
      </div>

      {/* Trade Assurance callout */}
      <div className="py-14 text-center px-4" style={{ background: "#E8820C" }}>
        <div className="text-4xl mb-3">🔒</div>
        <h2 className="text-2xl font-black text-white mb-2">Trade Assurance — Built In</h2>
        <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
          Every transaction is covered by our Trade Assurance programme. Buyer's payment is
          held in escrow and released only after confirmed delivery and quality approval.
        </p>
        <Link href="/rfq"
          className="inline-block px-6 py-3 rounded-xl font-bold text-sm bg-white"
          style={{ color: "#E8820C" }}>
          Post a Free RFQ Now
        </Link>
      </div>

      <Footer />
    </>
  );
}
