import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "EcomLanka – Sri Lanka's Premier B2B Marketplace",
  description:
    "Connect with verified Sri Lankan suppliers and exporters. " +
    "Source Ceylon tea, precious gems, textiles, spices, and more with confidence.",
  keywords: "Sri Lanka, B2B, marketplace, Ceylon tea, gems, exporters, suppliers, cinnamon, batik, coconut",
  openGraph: {
    title: "EcomLanka – Sri Lanka's B2B Export Marketplace",
    description: "Source directly from Sri Lanka's best exporters.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
