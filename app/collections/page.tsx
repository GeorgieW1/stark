"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CollectionsPage() {
  const collections = [
    {
      id: "lagos-nights",
      name: "Lagos Nights",
      description: "Dark, bold pieces inspired by the city after sunset",
      image: "/unnamed-6-scaled.jpg",
      itemCount: 12,
    },
    {
      id: "island-life",
      name: "Island Life",
      description: "Relaxed fits for the Lekki and VI lifestyle",
      image: "/lagos-street-fashion-lifestyle-photography.jpg",
      itemCount: 8,
    },
    {
      id: "street-essentials",
      name: "Street Essentials",
      description: "Core pieces every wardrobe needs",
      image: "/black-premium-hoodie-with-lagos-skyline-embroidery.jpg",
      itemCount: 15,
    },
  ]

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
            <h1 className="text-5xl sm:text-6xl font-bold text-white">Collections</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Curated collections that tell the story of Lagos through fashion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <Link href={`/shop?collection=${collection.id}`}>
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${collection.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white">{collection.name}</h2>
                        <span className="text-white/60 text-sm">({collection.itemCount} items)</span>
                      </div>
                      <p className="text-white/80 text-lg max-w-2xl">{collection.description}</p>
                      <Button className="bg-white text-black hover:bg-[#f4b5c1] hover:text-black group/btn">
                        Explore Collection
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
