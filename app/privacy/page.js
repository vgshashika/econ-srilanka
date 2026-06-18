import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us when you create an account, list products, submit inquiries, or contact us. This includes name, email address, company name, phone number, country, and payment details. We also automatically collect usage data such as IP address, browser type, pages visited, and actions taken on our platform.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information we collect to operate and improve EcomLanka, process transactions and send related information, send promotional communications (with your consent), respond to comments and questions, and monitor and analyze trends and usage. We do not sell your personal information to third parties.`,
  },
  {
    title: "3. Information Sharing",
    body: `We share your information with suppliers or buyers as necessary to facilitate transactions you initiate. We may also share information with service providers who assist in our operations (payment processors, hosting providers), and as required by law or to protect the rights of EcomLanka and its users.`,
  },
  {
    title: "4. Data Security",
    body: `We implement AES-256 encryption for stored data and TLS 1.3 for all data transmitted between your browser and our servers. Access to personal data is restricted to employees who need it to perform their job functions. We conduct regular security audits and maintain ISO 27001 compliance.`,
  },
  {
    title: "5. Cookies",
    body: `We use cookies to maintain session information, remember your preferences, and analyze how our platform is used. You can control cookie settings through your browser. Note that disabling certain cookies may affect the functionality of our platform.`,
  },
  {
    title: "6. Your Rights",
    body: `Depending on your location, you may have the right to access, correct, or delete personal information we hold about you, object to processing, request data portability, and withdraw consent at any time. To exercise these rights, contact us at privacy@ecomlanka.lk.`,
  },
  {
    title: "7. Data Retention",
    body: `We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data at any time.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the effective date below. Your continued use of EcomLanka after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    body: `If you have questions about this Privacy Policy or our data practices, contact us at: privacy@ecomlanka.lk | EcomLanka Pvt Ltd, No. 47, Galle Road, Colombo 03, Sri Lanka | +94 11 234 5678`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <Navbar />

      <div className="py-12 text-center px-4" style={{ background: "#0C1E35" }}>
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
          Effective date: January 1, 2025 · Last updated: June 1, 2025
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-8">
        <div className="bg-white rounded-2xl p-6 border border-orange-100"
          style={{ background: "#FFF7ED" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
            <strong>Summary:</strong> EcomLanka collects only the information needed to operate
            our B2B marketplace. We never sell your data. You can request deletion of your account
            at any time. For questions, email us at privacy@ecomlanka.lk.
          </p>
        </div>

        {SECTIONS.map(({ title, body }) => (
          <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2 className="font-black text-base mb-3" style={{ color: "#0C1E35" }}>{title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
