"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, CheckCircle } from "lucide-react"
import type { Review } from "@/lib/types"

interface ReviewItemProps {
  review: Review
}

export function ReviewItem({ review }: ReviewItemProps) {
  const [expanded, setExpanded] = useState(false)
  const shouldTruncate = review.comment.length > 150

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-foreground">{review.userName}</h4>
            {review.verifiedPurchase && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle className="h-3 w-3" />
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Star Rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-[#f4b5c1] text-[#f4b5c1]"
                      : "fill-transparent text-foreground/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-foreground/60">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-foreground/80 leading-relaxed">
        {shouldTruncate && !expanded ? (
          <>
            {review.comment.substring(0, 150)}...
            <button
              onClick={() => setExpanded(true)}
              className="ml-1 text-[#f4b5c1] hover:underline"
            >
              Read more
            </button>
          </>
        ) : (
          review.comment
        )}
      </p>
    </motion.div>
  )
}

interface ReviewListProps {
  reviews: Review[]
  averageRating?: number
  totalReviews?: number
}

export function ReviewList({ reviews, averageRating, totalReviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      {averageRating !== undefined && totalReviews !== undefined && (
        <div className="flex items-center gap-6 pb-6 border-b border-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "fill-[#f4b5c1] text-[#f4b5c1]"
                      : "fill-transparent text-foreground/20"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-foreground/60 mt-1">{totalReviews} {totalReviews === 1 ? "review" : "reviews"}</p>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

