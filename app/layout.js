import "./globals.css";

export const metadata = {
  title: "Ecom.lk – Sri Lanka's Premier B2B Marketplace",
  description:
    "Connect with 10,000+ verified Sri Lankan suppliers and exporters. " +
    "Trade Ceylon tea, precious gems, textiles, spices, and more with confidence.",
  keywords:
    "Sri Lanka, B2B, marketplace, Ceylon tea, gems, exporters, suppliers, cinnamon, batik",
};

/**
 * RootLayout wraps every page in the app.
 * It applies the global stylesheet and sets the <html> lang attribute.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
