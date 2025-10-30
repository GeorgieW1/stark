import type React from "react";
import type { Metadata } from "next";

import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// ✅ Import all fonts once, cleanly
import { Geist, Geist_Mono, Source_Serif_4, Outfit } from "next/font/google";

// ✅ Initialize fonts
const geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
});

// ✅ Page metadata
export const metadata: Metadata = {
  title: "STARK - Premium Nigerian Streetwear",
  description:
    "STARK: Premium unisex streetwear designed in Lagos. Best travel outfits, nationwide delivery. Order, pay, receive.",
  generator: "v0.app",
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
      </body>
    </html>
  );
}
