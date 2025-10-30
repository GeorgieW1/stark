"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, ArrowRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-4 text-center space-y-8"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="bg-green-500/20 p-8 rounded-full">
            <CheckCircle className="h-24 w-24 text-green-400" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Order Confirmed!</h1>
          <p className="text-white/70 text-lg">
            Thank you for your purchase. We've received your order and will start processing it right away.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-neutral-950 rounded-lg p-8 border border-white/10 space-y-6"
        >
          <div className="flex items-center justify-center gap-3 text-[#f4b5c1]">
            <Package className="h-6 w-6" />
            <span className="font-semibold">Order #LW-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>

          <div className="space-y-3 text-white/60">
            <p>A confirmation email has been sent to your email address.</p>
            <p>You can track your order status from your account dashboard.</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop">
            <Button size="lg" className="bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="pt-8 border-t border-white/10 space-y-3"
        >
          <p className="text-white/60 text-sm">Need help with your order?</p>
          <Link href="/contact" className="text-[#f4b5c1] hover:underline text-sm font-medium">
            Contact our support team
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
