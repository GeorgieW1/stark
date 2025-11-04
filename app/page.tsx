"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useEffect, useState } from "react"
import { productAPI, newsletterAPI } from "@/services/api"
import type { Product } from "@/lib/types"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const loadProducts = async () => {
      try {
        const products = await productAPI.getAll()
        setFeaturedProducts(products.filter((p) => p.featured).slice(0, 4))
      } catch (error) {
        console.error("[v0] Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Video */}
          {isMounted && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              preload="auto"
              onCanPlay={() => {
                setVideoReady(true)
              }}
              onLoadedData={() => {
                setVideoReady(true)
              }}
              onError={(e) => {
                console.error("Video failed to load:", e)
                e.currentTarget.style.display = "none"
                setVideoError(true)
              }}
            >
              <source
                src="/SaveClip.App_AQO3khYlZYrEo1FxAjU6WMtkXPBd9940UYyIu7drSlz1eCkpwtDQik2_WKQtxP2H6YuMT6wX2EOlgHS5Lu9T7m86ljmrUenlU5_uvVA.mp4"
                type="video/mp4"
              />
            </video>
          )}
          {/* Fallback Image - Only show if video fails to load */}
          {isMounted && videoError && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/stark-hero-lifestyle.jpg')",
              }}
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4b5c1]/10 via-transparent to-[#f4b5c1]/10 animate-pulse" />
        </div>

        {/* Floating Elements - Only render on client */}
        {isMounted && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const positions = [
                { x: 15, y: 20 },
                { x: 65, y: 45 },
                { x: 35, y: 70 },
                { x: 80, y: 30 },
                { x: 50, y: 85 },
                { x: 90, y: 60 },
              ]
              const pos = positions[i] || { x: 50, y: 50 }
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#f4b5c1]/30 rounded-full"
                  initial={{
                    x: `${pos.x}%`,
                    y: `${pos.y}%`,
                    opacity: 0.3,
                  }}
                  animate={{
                    y: [`${pos.y}%`, `${(pos.y + 30) % 100}%`, `${pos.y}%`],
                    x: [`${pos.x}%`, `${(pos.x + 20) % 100}%`, `${pos.x}%`],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-[#f4b5c1]" />
              </motion.div>
              <span className="text-sm font-semibold text-white tracking-wide">Premium Unisex Streetwear</span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(244,181,193,0.5)",
                      "0 0 30px rgba(244,181,193,0.8)",
                      "0 0 20px rgba(244,181,193,0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="block"
                >
                  STARK
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="block text-[#f4b5c1] bg-gradient-to-r from-[#f4b5c1] to-white bg-clip-text text-transparent"
                >
                  COLLECTION
                </motion.span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed"
            >
              <span className="font-semibold">Premium Nigerian Streetwear</span>
              <br />
              <span className="text-white/70">Designed in Lagos. Worn Worldwide.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
            >
              <Link href="/shop">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-[#f4b5c1] hover:text-black text-lg px-10 py-7 group shadow-2xl font-semibold tracking-wide"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/collections">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/50 text-white hover:bg-white hover:text-black text-lg px-10 py-7 bg-white/5 backdrop-blur-sm font-semibold tracking-wide shadow-xl"
                  >
                    Explore Collections
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/80"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#f4b5c1]">Nationwide</div>
                <div className="text-sm">Delivery</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#f4b5c1]">Premium</div>
                <div className="text-sm">Quality</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#f4b5c1]">Unisex</div>
                <div className="text-sm">Design</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/10"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="w-1.5 h-3 bg-[#f4b5c1] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Featured Pieces</h2>
            <p className="text-white/60 text-lg">Handpicked essentials from our latest collection</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-neutral-900 rounded-lg mb-4" />
                  <div className="h-4 bg-neutral-900 rounded mb-2" />
                  <div className="h-4 bg-neutral-900 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Behind the Brand</h2>
            <p className="text-white/60 text-lg">Experience STARK through our lens</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group rounded-lg overflow-hidden bg-neutral-900 shadow-2xl"
            >
              <div className="relative aspect-[9/16] lg:aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="auto"
                >
                  <source
                    src="/SaveClip.App_AQO6IDYGNVFjPyFaJfk-HuDIl0tmKWyWNxkR4Pl7KrfvR5Fe0Ir7ZyPfU2-XzCMG77fb1fifQRFDJNTT1cnngsLN5pLOmjsLVQTMDTQ.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group rounded-lg overflow-hidden bg-neutral-900 shadow-2xl"
            >
              <div className="relative aspect-[9/16] lg:aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="auto"
                >
                  <source
                    src="/SaveClip.App_AQPD92rVeUgIOwqBc9wGDcxaUT9BlTsRqA8QFd1trUJF1VUApODti80A6kNlvcrsJYdC2hI3-3MH3FmPsBMdHjQYclqusERQAiY22vQ.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/SaveClip.App_573165403_18077691014155656_5474932771996079243_n.jpg')",
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                STARK:
                <br />
                <span className="text-[#f4b5c1]">Lagos to the World</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                STARK is more than just a clothing brand. We're a movement celebrating Nigerian style, confidence, and
                unisex fashion. Every piece is designed with intention, crafted with quality, and delivered nationwide.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                From our base in Lagos, we bring you premium streetwear that works for everyone. Best travel outfits.
                Unisex boutiques. Fixed prices. No refunds. Just pure, authentic STARK.
              </p>
              <Link href="/about">
                <Button size="lg" className="bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90">
                  Our Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Stay in the Loop</h2>
          <p className="text-white/70 text-lg">
            Get early access to new drops, exclusive offers, and behind-the-scenes content from STARK.
          </p>
          <form 
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const email = formData.get("email") as string
              
              try {
                await newsletterAPI.subscribe(email)
                alert("Thank you for subscribing! Check your email for confirmation.")
                e.currentTarget.reset()
              } catch (error) {
                console.error("Newsletter subscription error:", error)
                alert("Failed to subscribe. Please try again.")
              }
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f4b5c1]"
            />
            <Button type="submit" size="lg" className="bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90 px-8">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}
