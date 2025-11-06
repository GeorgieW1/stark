"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { reviewAPI } from "@/services/api"
import type { Review } from "@/lib/types"

interface ReviewFormProps {
  productId: string
  onReviewSubmitted: (review: Review) => void
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !comment.trim() || !userName.trim()) {
      alert("Please fill in all required fields and select a rating")
      return
    }

    setLoading(true)

    try {
      const review = await reviewAPI.create(productId, {
        rating,
        comment: comment.trim(),
        userName: userName.trim(),
        userEmail: userEmail.trim() || undefined,
      })

      onReviewSubmitted(review)
      setSubmitted(true)
      setRating(0)
      setComment("")
      setUserName("")
      setUserEmail("")

      setTimeout(() => setSubmitted(false), 3000)
    } catch (error: any) {
      console.error("Review submission error:", error)
      alert(error.response?.data?.message || "Failed to submit review. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 space-y-6"
    >
      <h3 className="text-2xl font-bold text-foreground">Write a Review</h3>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400"
        >
          Thank you for your review! It will be displayed after moderation.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div className="space-y-2">
          <Label className="text-foreground">Rating *</Label>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      starValue <= (hoveredRating || rating)
                        ? "fill-[#f4b5c1] text-[#f4b5c1]"
                        : "fill-transparent text-foreground/20 hover:text-[#f4b5c1]/50"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="userName" className="text-foreground">
            Your Name *
          </Label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="bg-background border-border text-foreground placeholder:text-foreground/50"
            placeholder="John Doe"
          />
        </div>

        {/* Email (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="userEmail" className="text-foreground">
            Email (Optional)
          </Label>
          <Input
            id="userEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="bg-background border-border text-foreground placeholder:text-foreground/50"
            placeholder="john@example.com"
          />
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Label htmlFor="comment" className="text-foreground">
            Your Review *
          </Label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#f4b5c1] resize-none"
            placeholder="Share your experience with this product..."
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !rating || !comment.trim() || !userName.trim()}
          className="w-full bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Review
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}

