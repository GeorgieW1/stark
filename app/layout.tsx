import type React from "react";
import type { Metadata } from "next";

import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

// ✅ Import only needed font
import { Outfit } from "next/font/google";

// ✅ Initialize font with only needed weights
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ✅ Enhanced SEO metadata
export const metadata: Metadata = {
  title: {
    default: "STARK - Premium Nigerian Streetwear",
    template: "%s | STARK",
  },
  description:
    "STARK: Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery. Order, pay, receive.",
  keywords: ["streetwear", "Nigerian fashion", "Lagos", "unisex clothing", "premium fashion", "STARK"],
  authors: [{ name: "STARK" }],
  creator: "STARK",
  publisher: "STARK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "STARK",
    title: "STARK - Premium Nigerian Streetwear",
    description: "Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery.",
    images: [
      {
        url: "/stark-hero-lifestyle.jpg",
        width: 1200,
        height: 630,
        alt: "STARK Premium Streetwear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STARK - Premium Nigerian Streetwear",
    description: "Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery.",
    images: ["/stark-hero-lifestyle.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ✅ Layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
