"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ShoppingBag, Check, ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/context/cart-context"
import { productAPI } from "@/services/api"
import type { Product } from "@/lib/types"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productAPI.getById(params.id as string)
        setProduct(data)
        setSelectedSize(data.sizes[0])

        // Load related products
        const allProducts = await productAPI.getAll()
        const related = allProducts.filter((p) => p.category === data.category && p.id !== data.id).slice(0, 4)
        setRelatedProducts(related)
      } catch (error) {
        console.error("[v0] Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addItem(product, selectedSize, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white text-lg">Product not found</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </motion.button>
      </div>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.images[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-[#f4b5c1]" : "ring-1 ring-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title & Price */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#f4b5c1] text-sm font-medium uppercase tracking-wide">{product.category}</p>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">{product.name}</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#f4b5c1] hover:bg-white/10">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-3xl font-bold text-white">₦{product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold">Description</h3>
              <p className="text-white/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      selectedSize === size ? "bg-[#f4b5c1] text-black" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  -
                </Button>
                <span className="text-white font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90 text-lg py-6"
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              {!product.inStock && <p className="text-red-400 text-sm text-center">Out of stock</p>}
            </div>

            {/* Product Details */}
            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">SKU</span>
                <span className="text-white">{product.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Category</span>
                <span className="text-white capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Availability</span>
                <span className={product.inStock ? "text-green-400" : "text-red-400"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-white/10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">You Might Also Like</h2>
              <p className="text-white/60">More pieces from the {product.category} collection</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
