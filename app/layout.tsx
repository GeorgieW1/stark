import type React from "react";
import type { Metadata } from "next";

import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { ThemeProvider } from "@/components/theme-provider";
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
    default: "VORTEX - Premium Nigerian Streetwear",
    template: "%s | VORTEX",
  },
  description:
    "VORTEX: Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery. Order, pay, receive.",
  keywords: ["streetwear", "Nigerian fashion", "Lagos", "unisex clothing", "premium fashion", "VORTEX"],
  authors: [{ name: "VORTEX" }],
  creator: "VORTEX",
  publisher: "VORTEX",
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
    siteName: "VORTEX",
    title: "VORTEX - Premium Nigerian Streetwear",
    description: "Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery.",
    images: [
      {
        url: "/vortex-hero-lifestyle.jpg",
        width: 1200,
        height: 630,
        alt: "VORTEX Premium Streetwear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VORTEX - Premium Nigerian Streetwear",
    description: "Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery.",
    images: ["/vortex-hero-lifestyle.jpg"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CartProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
