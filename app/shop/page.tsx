"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { productAPI } from "@/services/api"
import type { Product } from "@/lib/types"

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", label: "All" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "unisex", label: "Unisex" },
  ]

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productAPI.getAll()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("[v0] Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => p.category === activeCategory))
    }
  }, [activeCategory, products])

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white">Shop All</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover our full collection of premium Nigerian streetwear. Every piece crafted with purpose and pride.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#f4b5c1] text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <p className="text-white/60 text-sm">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 flex flex-wrap gap-2"
              >
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setShowFilters(false)
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#f4b5c1] text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-neutral-900 rounded-lg mb-4" />
                  <div className="h-4 bg-neutral-900 rounded mb-2" />
                  <div className="h-4 bg-neutral-900 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <p className="text-white/60 text-lg">No products found in this category.</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
