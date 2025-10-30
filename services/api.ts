import axios from "axios"
import type { Product, User } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Product APIs
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    // Placeholder - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS)
      }, 500)
    })
  },

  getById: async (id: string): Promise<Product> => {
    // Placeholder - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find((p) => p.id === id)
        resolve(product || MOCK_PRODUCTS[0])
      }, 500)
    })
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    // Placeholder - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS.filter((p) => p.category === category))
      }, 500)
    })
  },
}

// Auth APIs (placeholders for future integration)
export const authAPI = {
  signup: async (email: string, password: string, name: string): Promise<User> => {
    const response = await api.post("/auth/signup", { email, password, name })
    return response.data
  },

  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
  },
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "STARK Pink Embroidered Hoodie",
    price: 45000,
    description:
      "Premium oversized hoodie with embroidered STARK branding. Soft cotton blend with a relaxed fit. Available in pink with grey accents.",
    category: "unisex",
    images: ["/pink-embroidered-stark-hoodie-oversized.jpg", "/pink-hoodie-back-view.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "STARK Black Embroidered Hoodie",
    price: 45000,
    description:
      "Classic black oversized hoodie with embroidered STARK logo. Premium heavyweight cotton for durability and comfort.",
    category: "unisex",
    images: ["/black-embroidered-stark-hoodie.jpg", "/black-hoodie-lifestyle.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "STARK Burgundy Tracksuit",
    price: 65000,
    description:
      "Complete tracksuit set in rich burgundy. Includes matching hoodie and joggers with embroidered STARK branding. Perfect for lifestyle wear.",
    category: "unisex",
    images: ["/burgundy-stark-tracksuit-set.jpg", "/burgundy-tracksuit-lifestyle.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "STARK Cream Oversized Hoodie",
    price: 45000,
    description:
      "Minimalist cream-colored hoodie with subtle STARK embroidery. Versatile piece that pairs with any outfit.",
    category: "unisex",
    images: ["/cream-oversized-stark-hoodie.jpg", "/cream-hoodie-detail.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "STARK Black Tracksuit",
    price: 65000,
    description:
      "Premium black tracksuit with embroidered STARK branding. Includes hoodie and matching joggers. Unisex fit.",
    category: "unisex",
    images: ["/black-stark-tracksuit-premium.jpg", "/black-tracksuit-full-look.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "6",
    name: "STARK Grey Embroidered Hoodie",
    price: 45000,
    description:
      "Soft grey hoodie with embroidered STARK logo and pink accents. Comfortable oversized fit for everyday wear.",
    category: "unisex",
    images: ["/grey-stark-hoodie-pink-accents.jpg", "/grey-hoodie-lifestyle.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "7",
    name: "STARK Black Joggers",
    price: 35000,
    description:
      "Premium black joggers with embroidered STARK branding. Comfortable fit with tapered ankles. Perfect for casual or athletic wear.",
    category: "unisex",
    images: ["/black-stark-joggers-premium.jpg", "/black-joggers-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "8",
    name: "STARK Cream Tracksuit",
    price: 65000,
    description:
      "Elegant cream tracksuit set with embroidered STARK logo. Includes hoodie and joggers. Versatile neutral tone.",
    category: "unisex",
    images: ["/cream-stark-tracksuit-elegant.jpg", "/placeholder.svg?height=500&width=500"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
]
