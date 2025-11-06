"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="bg-card p-8 rounded-full border border-border">
              <ShoppingBag className="h-16 w-16 text-foreground/60" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-foreground/60">Add some items to get started</p>
          <Link href="/shop">
            <Button size="lg" className="bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-foreground/60">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-lg p-6 border border-border"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="min-w-0">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="text-foreground font-semibold hover:text-[#f4b5c1] transition-colors text-sm sm:text-base truncate">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-foreground/60 text-xs sm:text-sm mt-1">
                            Size: {item.size} • {item.product.category}
                          </p>
                        </div>
                        <p className="text-foreground font-bold text-sm sm:text-base flex-shrink-0">
                          ₦{item.product.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="border-border text-foreground hover:bg-accent h-8 w-8 p-0 text-xs"
                          >
                            -
                          </Button>
                          <span className="text-foreground font-medium w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="border-border text-foreground hover:bg-accent h-8 w-8 p-0 text-xs"
                          >
                            +
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 text-xs sm:text-sm justify-start sm:justify-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Remove</span>
                          <span className="sm:hidden">Remove</span>
                        </Button>
                      </div>

                      {/* Subtotal */}
                      <div className="pt-3 sm:pt-4 border-t border-border">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-foreground/60">Subtotal</span>
                          <span className="text-foreground font-semibold">
                            ₦{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-foreground text-xl font-bold">
                    <span>Total</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90 text-lg py-6">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/shop" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-border text-foreground hover:bg-accent bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Free shipping over ₦50,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
