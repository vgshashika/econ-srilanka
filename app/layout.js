import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
