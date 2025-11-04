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
    images: ["/SaveClip.App_571445939_18077190074155656_3678702186249413007_n.jpg", "/SaveClip.App_571972715_18077436095155656_8508195319942056107_n.jpg"],
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
    images: ["/SaveClip.App_572147876_18077634716155656_6547323135376726351_n.jpg", "/SaveClip.App_572203968_18077690987155656_6694396088596332871_n.jpg"],
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
    images: ["/SaveClip.App_572711138_18077691005155656_1110256909655516316_n.jpg", "/SaveClip.App_573153613_18077452118155656_3650618018436970485_n.jpg"],
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
    images: ["/SaveClip.App_573165403_18077691014155656_5474932771996079243_n.jpg", "/SaveClip.App_573597029_18077436077155656_6339063922354062092_n.jpg"],
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
    images: ["/SaveClip.App_573826885_18077634725155656_4177940957292664023_n.jpg", "/SaveClip.App_573906262_18077436086155656_5754688778190661362_n.jpg"],
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
    images: ["/SaveClip.App_571445939_18077190074155656_3678702186249413007_n.jpg", "/SaveClip.App_571972715_18077436095155656_8508195319942056107_n.jpg"],
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
    images: ["/SaveClip.App_572147876_18077634716155656_6547323135376726351_n.jpg", "/SaveClip.App_572203968_18077690987155656_6694396088596332871_n.jpg"],
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
    images: ["/SaveClip.App_572711138_18077691005155656_1110256909655516316_n.jpg", "/SaveClip.App_573153613_18077452118155656_3650618018436970485_n.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
]
