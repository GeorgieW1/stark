"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white">
              About <span className="text-[#f4b5c1]">STARK</span>
            </h1>
            <p className="text-white/70 text-xl">Where culture meets fashion</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none space-y-8"
          >
            <div className="text-white/80 text-lg leading-relaxed space-y-6">
              <p>
                STARK was born from a simple vision: to create premium streetwear that celebrates Nigerian culture
                and creativity while competing on the global stage.
              </p>

              <p>
                Founded in the heart of Lagos, we draw inspiration from the vibrant energy of our city - from the
                bustling markets of Balogun to the creative hubs of Lekki, from the nightlife of Victoria Island to the
                authentic street culture that makes Lagos unique.
              </p>

              <p>
                Every piece we create tells a story. A story of resilience, creativity, and pride. We're not just making
                clothes - we're building a movement that shows the world what Nigerian fashion can be.
              </p>

              <p>
                Our commitment is to quality, authenticity, and cultural representation. We work with local artisans and
                manufacturers, ensuring that every stitch contributes to our community's growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
