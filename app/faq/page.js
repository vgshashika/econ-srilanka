"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const FAQS = [
  {
    category: "For Buyers",
    items: [
      { q: "Is EcomLanka free to use for buyers?", a: "Yes. Browsing, searching, sending inquiries, and posting RFQs are completely free for buyers. You only pay when you place an order with a supplier." },
      { q: "How do I know suppliers are trustworthy?", a: "All suppliers go through a manual verification process before listing. We check business registration, export licenses, certifications, and product samples. Verified suppliers show a ✓ badge on their profile." },
      { q: "What is Trade Assurance?", a: "Trade Assurance is our built-in payment protection. When you pay through EcomLanka, funds are held in escrow. They are only released to the supplier after you confirm receipt and quality approval. If goods don't arrive or don't match the agreed specs, you are eligible for a full refund." },
      { q: "Can I request product samples before ordering?", a: "Yes. Most suppliers offer samples. Simply mention it in your inquiry or use the 'Request Sample' button on the product page. Suppliers typically charge sample costs plus shipping, which is deducted from your first bulk order." },
      { q: "What payment methods are accepted?", a: "We accept bank transfer (T/T), Letter of Credit (L/C), PayPal, and major credit cards for Trade Assurance orders." },
      { q: "How long does shipping take?", a: "Lead times vary by supplier and product. Most suppliers show their lead time on the product page (typically 7–21 days for production + 5–15 days for shipping). Your supplier will provide a confirmed timeline in their quote." },
    ],
  },
  {
    category: "For Suppliers",
    items: [
      { q: "How do I register as a supplier?", a: "Click 'Register Free' and choose the Supplier role. Complete your company profile, upload your certifications and product photos, and submit for verification. Our team reviews applications within 2–3 business days." },
      { q: "Is there a fee to list products?", a: "Basic listings are free. We offer premium listing plans that give you higher search rankings, a verified badge, featured placement, and analytics. See our Pricing page for details." },
      { q: "How do I receive payments?", a: "Payments are processed through Trade Assurance. Once the buyer confirms delivery, funds are transferred to your registered bank account within 3–5 business days." },
      { q: "What certifications do I need?", a: "Basic certifications (business registration, export license) are required for all suppliers. Category-specific certifications (ISO, HACCP, GIA, Rainforest Alliance, etc.) increase buyer confidence and are shown as badges on your listing." },
    ],
  },
  {
    category: "Platform & Technical",
    items: [
      { q: "Is my data safe on EcomLanka?", a: "Yes. We use AES-256 encryption for stored data and TLS 1.3 for all data in transit. We never share your personal or business information with third parties without your consent." },
      { q: "Can I use EcomLanka on mobile?", a: "Yes. EcomLanka is fully responsive and works on all devices. A dedicated mobile app for iOS and Android is coming in Q3 2025." },
      { q: "How do I contact support?", a: "Use our Contact page, email support@ecomlanka.lk, or call +94 11 234 5678. Our support team is available Monday–Friday 8AM–6PM and Saturday 9AM–1PM (Sri Lanka Time)." },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left">
        <span className="text-sm font-semibold" style={{ color: "#0C1E35" }}>{q}</span>
        <span className="text-xl flex-shrink-0 transition-transform duration-200"
          style={{ color: "#E8820C", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <Navbar />

      <div className="py-12 text-center px-4" style={{ background: "#0C1E35" }}>
        <h1 className="text-3xl font-black text-white">Frequently Asked Questions</h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>
          Everything you need to know about trading on EcomLanka.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
        {FAQS.map(({ category, items }) => (
          <div key={category}>
            <h2 className="font-black text-lg mb-4" style={{ color: "#0C1E35" }}>{category}</h2>
            <div className="bg-white rounded-2xl px-6 border border-gray-100"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              {items.map(item => <FAQItem key={item.q} {...item} />)}
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <p className="text-sm text-gray-500 mb-4">Didn't find what you were looking for?</p>
          <Link href="/contact"
            className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: "#E8820C" }}>
            Contact Support →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
