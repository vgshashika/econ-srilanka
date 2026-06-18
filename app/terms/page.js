import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  { title:"1. Acceptance of Terms",       body:"By accessing or using EcomLanka, you agree to be bound by these Terms of Service. If you do not agree to all these terms, do not use our platform. These terms apply to all users including buyers, suppliers, and visitors." },
  { title:"2. Platform Use",              body:"EcomLanka is a B2B marketplace. You may use the platform only for lawful purposes and in accordance with these Terms. You agree not to misuse the platform, post false information, infringe intellectual property rights, or use automated tools to scrape data." },
  { title:"3. Supplier Obligations",      body:"Suppliers must provide accurate product information, hold all necessary export licenses and certifications, fulfill orders as agreed, and respond to buyer inquiries within 48 hours. EcomLanka verifies suppliers but is not liable for product quality or delivery failures." },
  { title:"4. Buyer Obligations",         body:"Buyers must provide accurate contact and company information, pay for orders as agreed, and use Trade Assurance in good faith. Buyers may not submit fraudulent inquiries or request quotes without genuine purchasing intent." },
  { title:"5. Trade Assurance",           body:"Trade Assurance is provided to protect payments on qualifying transactions. Funds are held until the buyer confirms receipt and quality. Disputes must be raised within 30 days of delivery. EcomLanka's decision on disputes is final." },
  { title:"6. Fees and Payments",         body:"Basic listings and buyer accounts are free. Premium plans incur monthly or annual fees as shown on our Pricing page. All fees are in USD. EcomLanka charges a platform commission on Trade Assurance transactions as disclosed at checkout." },
  { title:"7. Intellectual Property",     body:"EcomLanka and its logo are trademarks of EcomLanka Pvt Ltd. Suppliers retain ownership of their product listings and images but grant EcomLanka a licence to display them. You may not reproduce or distribute EcomLanka content without permission." },
  { title:"8. Limitation of Liability",   body:"EcomLanka is a marketplace and is not party to transactions between buyers and suppliers. We are not liable for product defects, delivery failures, or disputes beyond the Trade Assurance policy. Our liability is limited to the value of the applicable transaction." },
  { title:"9. Termination",              body:"EcomLanka may suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or harm the platform or its users. Users may close their account at any time by contacting support." },
  { title:"10. Governing Law",           body:"These Terms are governed by the laws of Sri Lanka. Any disputes shall be resolved in the courts of Colombo, Sri Lanka, unless otherwise required by applicable law." },
  { title:"11. Changes to Terms",        body:"We may update these Terms at any time. We will notify users of material changes by email or platform notice. Continued use of EcomLanka after changes constitutes acceptance." },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <Navbar />

      <div className="py-12 text-center px-4" style={{ background: "#0C1E35" }}>
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
          Effective date: January 1, 2025 · Last updated: June 1, 2025
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-6">
        <div className="rounded-2xl p-5 border border-blue-100"
          style={{ background: "#EFF6FF" }}>
          <p className="text-sm leading-relaxed text-blue-800">
            <strong>By using EcomLanka</strong>, you accept these Terms. Please read them carefully.
            For questions, contact legal@ecomlanka.lk.
          </p>
        </div>

        {SECTIONS.map(({ title, body }) => (
          <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2 className="font-black text-base mb-3" style={{ color: "#0C1E35" }}>{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
          </div>
        ))}

        <p className="text-xs text-center text-gray-400 pt-4">
          EcomLanka Pvt Ltd · No. 47, Galle Road, Colombo 03, Sri Lanka · legal@ecomlanka.lk
        </p>
      </div>

      <Footer />
    </>
  );
}
