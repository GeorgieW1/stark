"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/cart-context"
import { orderAPI } from "@/services/api"
import type { CheckoutFormData } from "@/lib/types"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "paystack",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || 
        !formData.address.trim() || !formData.city.trim() || !formData.state.trim()) {
      alert("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number")
      return
    }

    setLoading(true)

    try {
      // Call backend API to create order
      const response = await orderAPI.createOrder({
        items: items.map((item) => ({
          productId: item.product.id,
          size: item.size,
          quantity: item.quantity,
          price: item.product.price,
        })),
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
        },
        paymentMethod: formData.paymentMethod,
        subtotal: totalPrice,
        shipping: shippingFee,
        total: finalTotal,
      })

      // If payment gateway URL is provided, redirect to payment
      if (response.paymentUrl) {
        // For Verge, redirect to payment page
        // Verge will redirect back to /checkout/verge-callback with Id and Status
        window.location.href = response.paymentUrl
        return
      }

      // If order ID is returned (for non-redirect payments), go to success
      if (response.orderId) {
        clearCart()
        router.push(`/checkout/success?orderId=${response.orderId}`)
        return
      }

      // Otherwise, redirect to success page
      clearCart()
      const orderId = response.orderId || "unknown"
      router.push(`/checkout/success?orderId=${orderId}`)
    } catch (error: any) {
      console.error("Checkout error:", error)
      const errorMessage =
        error.response?.data?.message || "There was an error processing your order. Please try again."
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const shippingFee = totalPrice > 50000 ? 0 : 3000
  const finalTotal = totalPrice + shippingFee

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Secure checkout</span>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-neutral-950 rounded-lg p-6 border border-white/10 space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-neutral-950 rounded-lg p-6 border border-white/10 space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Shipping Address</h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Street Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Lagos"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-white">
                        State
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Lagos"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-neutral-950 rounded-lg p-6 border border-white/10 space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Payment Method</h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 rounded-lg border border-white/20 cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paystack"
                      checked={formData.paymentMethod === "paystack"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#f4b5c1]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-white" />
                        <span className="text-white font-medium">Paystack</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">Pay securely with card or bank transfer</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-lg border border-white/20 cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="flutterwave"
                      checked={formData.paymentMethod === "flutterwave"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#f4b5c1]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-white" />
                        <span className="text-white font-medium">Flutterwave</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">Multiple payment options available</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-lg border border-white/20 cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="verge"
                      checked={formData.paymentMethod === "verge"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#f4b5c1]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-white" />
                        <span className="text-white font-medium">Verge Payment</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">USSD, Card, NQR, or Bank Transfer - All payment channels</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-neutral-950 rounded-lg p-6 border border-white/10 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded bg-neutral-900 overflow-hidden">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                        />
                        <div className="absolute -top-2 -right-2 bg-[#f4b5c1] text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-white/60 text-xs">Size: {item.size}</p>
                        <p className="text-white text-sm font-semibold mt-1">
                          ₦{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? "Free" : `₦${shippingFee.toLocaleString()}`}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span>₦{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90 text-lg py-6"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Complete Order
                    </>
                  )}
                </Button>

                <p className="text-white/60 text-xs text-center">
                  By completing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}
