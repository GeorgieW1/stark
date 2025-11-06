"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VergeCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [orderId, setOrderId] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    // Verge redirects back with Id and Status as query parameters
    const id = searchParams.get("Id") || searchParams.get("id")
    const paymentStatus = searchParams.get("Status") || searchParams.get("status")

    if (id) {
      setOrderId(id)
    }

    // Check payment status
    // According to Verge docs, ResponseCode "00" means successful
    if (paymentStatus === "00" || paymentStatus?.toLowerCase() === "success") {
      setStatus("success")
      setMessage("Payment successful! Your order has been confirmed.")
    } else if (paymentStatus) {
      setStatus("failed")
      setMessage(paymentStatus || "Payment was not successful. Please try again.")
    } else {
      // If no status, try to query backend for order status
      // For now, show loading and let backend handle verification
      setStatus("loading")
      setMessage("Verifying payment status...")
      
      // Optionally: Query backend API to verify payment status
      // This would be: GET /orders/{orderId}/status
    }
  }, [searchParams])

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center space-y-8 w-full"
      >
        {status === "loading" && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex justify-center"
            >
              <Loader2 className="h-24 w-24 text-[#f4b5c1]" />
            </motion.div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Processing Payment</h1>
              <p className="text-foreground/70 text-lg">{message}</p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Payment Successful!</h1>
              <p className="text-foreground/70 text-lg">{message}</p>
              {orderId && (
                <p className="text-foreground/60 text-sm">Transaction ID: {orderId}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/checkout/success">
                <Button size="lg" className="bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90">
                  View Order Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </>
        )}

        {status === "failed" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="bg-red-500/20 p-8 rounded-full">
                <XCircle className="h-24 w-24 text-red-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Payment Failed</h1>
              <p className="text-foreground/70 text-lg">{message}</p>
              {orderId && (
                <p className="text-foreground/60 text-sm">Transaction ID: {orderId}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/checkout">
                <Button size="lg" className="bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90">
                  Try Again
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
                  Back to Cart
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}

