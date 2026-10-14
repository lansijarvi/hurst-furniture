import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeApplier from "@/components/ThemeApplier";
import { defaultContent } from "@/lib/content";

const { contact } = defaultContent;
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hurstfurniture.com"),
  title: { default: "Hurst Concepts | Custom Furniture & Millwork in Seattle", template: "%s | Hurst Concepts" },
  description:
    "Custom furniture, built-ins and millwork designed and built in Seattle's Ballard neighborhood. Cost-plus pricing, engineer-led craftsmanship since 2011.",
  openGraph: { type: "website", siteName: "Hurst Concepts" },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: "Hurst Concepts",
  url: "https://www.hurstfurniture.com",
  email: contact.email,
  telephone: "+1-206-782-1377",
  foundingDate: "2011",
  address: {
    "@type": "PostalAddress",
    streetAddress: "943 NW 50th St",
    addressLocality: "Seattle",
    addressRegion: "WA",
    postalCode: "98107",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable} data-theme={defaultContent.theme.mode} suppressHydrationWarning>
      <head>
        {/* Admin preview: ?theme=dark|light shows that theme for this tab only (see ThemeApplier). */}
        <script dangerouslySetInnerHTML={{ __html: `try{var q=new URLSearchParams(location.search).get("theme");if(q==="off")sessionStorage.removeItem("themePreview");else if(q)sessionStorage.setItem("themePreview",q);var t=sessionStorage.getItem("themePreview");if(t)document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ThemeApplier />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </body>
    </html>
  );
}
