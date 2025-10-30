import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              LAGOS<span className="text-[#f4b5c1]">WEAR</span>
            </h3>
            <p className="text-white/60 text-sm">Premium Nigerian streetwear. Crafted in Lagos, worn worldwide.</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/shop?category=men" className="hover:text-white transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop?category=women" className="hover:text-white transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop?category=unisex" className="hover:text-white transition-colors">
                  Unisex
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#f4b5c1] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#f4b5c1] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#f4b5c1] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} LagosWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
