"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, product.sizes[0])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-neutral-900 rounded-lg mb-4">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button onClick={handleQuickAdd} className="bg-white text-black hover:bg-[#f4b5c1] hover:text-black">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </motion.div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-[#f4b5c1] text-black text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-white group-hover:text-[#f4b5c1] transition-colors">{product.name}</h3>
          <p className="text-white/60 text-sm">{product.category.toUpperCase()}</p>
          <p className="text-white font-bold">₦{product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  )
}
