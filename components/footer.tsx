import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-foreground">STARK</span>
            </h3>
            <p className="text-foreground/60 text-sm">Premium Nigerian streetwear. Crafted in Lagos, worn worldwide.</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Shop</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/shop?category=men" className="hover:text-foreground transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop?category=women" className="hover:text-foreground transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop?category=unisex" className="hover:text-foreground transition-colors">
                  Unisex
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-foreground transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@stark.com" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <span className="text-foreground/60">Shipping: Nationwide delivery</span>
              </li>
              <li>
                <span className="text-foreground/60">Free shipping over ₦50,000</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-[#f4b5c1] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-[#f4b5c1] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-[#f4b5c1] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} STARK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
