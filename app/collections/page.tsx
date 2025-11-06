"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CollectionsPage() {
  const collections = [
    {
      id: "lagos-nights",
      name: "Lagos Nights",
      description: "Dark, bold pieces inspired by the city after sunset",
      image: "/unnamed-6-scaled.jpg",
      itemCount: 12,
      accent: "#f4b5c1",
    },
    {
      id: "island-life",
      name: "Island Life",
      description: "Relaxed fits for the Lekki and VI lifestyle",
      image: "/lagos-street-fashion-lifestyle-photography.jpg",
      itemCount: 8,
      accent: "#f4b5c1",
    },
    {
      id: "street-essentials",
      name: "Street Essentials",
      description: "Core pieces every wardrobe needs",
      image: "/black-premium-hoodie-with-lagos-skyline-embroidery.jpg",
      itemCount: 15,
      accent: "#f4b5c1",
    },
  ]

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-border overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#f4b5c1]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f4b5c1]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#f4b5c1]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#f4b5c1]/20"
            >
              <Sparkles className="h-4 w-4 text-[#f4b5c1]" />
              <span className="text-sm font-semibold text-foreground/80">Curated Collections</span>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-foreground leading-tight tracking-tight">
              <span className="block">Collections</span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block text-[#f4b5c1] bg-gradient-to-r from-[#f4b5c1] to-[#f4b5c1]/60 bg-clip-text text-transparent"
              >
                by STARK
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-foreground/70 text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Curated collections that tell the story of Lagos through fashion. Each piece crafted with intention and
              designed for the modern Nigerian lifestyle.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {collections.map((collection, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link href={`/shop?collection=${collection.id}`}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Image Section */}
                    <motion.div
                      className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-card">
                        {/* Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                          style={{ backgroundImage: `url(${collection.image})` }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        
                        {/* Accent Border Effect */}
                        <div className="absolute inset-0 border-2 border-[#f4b5c1]/0 group-hover:border-[#f4b5c1]/30 rounded-2xl transition-all duration-500" />
                        
                        {/* Decorative Corner Element */}
                        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#f4b5c1]/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#f4b5c1]/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                      className={`space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.8 }}
                    >
                      {/* Collection Number Badge */}
                      <div className="flex items-center gap-4">
                        <div className="text-6xl font-black text-[#f4b5c1]/20 leading-none">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#f4b5c1]/30 to-transparent" />
                      </div>

                      {/* Collection Name */}
                      <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground leading-tight tracking-tight">
                        {collection.name}
                      </h2>

                      {/* Item Count */}
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-[#f4b5c1]/10 border border-[#f4b5c1]/20 rounded-full text-sm font-semibold text-[#f4b5c1]">
                          {collection.itemCount} {collection.itemCount === 1 ? "piece" : "pieces"}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/70 text-lg md:text-xl leading-relaxed max-w-xl">
                        {collection.description}
                      </p>

                      {/* CTA Button */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Button
                          size="lg"
                          className="group/btn bg-[#f4b5c1] text-black hover:bg-[#f4b5c1]/90 text-lg px-8 py-6 shadow-lg shadow-[#f4b5c1]/20 hover:shadow-xl hover:shadow-[#f4b5c1]/30 transition-all duration-300"
                        >
                          Explore Collection
                          <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>

                      {/* Decorative Line */}
                      <div className="pt-8">
                        <div className="h-px w-24 bg-gradient-to-r from-[#f4b5c1] to-transparent" />
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8 bg-card border border-border rounded-3xl p-12 md:p-16 shadow-xl"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Discover Your Style
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
            Browse our complete collection and find pieces that speak to your unique style. Every item is carefully
            selected to represent the best of Nigerian streetwear.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#f4b5c1] text-[#f4b5c1] hover:bg-[#f4b5c1] hover:text-black text-lg px-8 py-6 transition-all duration-300"
            >
              Shop All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
