import axios from "axios"
import type { Product, User } from "@/lib/types"

// ============================================================================
// API CONFIGURATION
// ============================================================================
// Set your backend API URL in .env.local file:
// NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
// 
// For production, add it to Vercel environment variables with the same name
// ============================================================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add authentication token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Handle API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        // window.location.href = "/login" // Uncomment when login page exists
      }
    }
    return Promise.reject(error)
  }
)

// ============================================================================
// PRODUCT APIs
// ============================================================================
// TODO: Replace mock data with real API calls
// Expected endpoints:
// - GET /products - Get all products
// - GET /products/:id - Get single product
// - GET /products?category=:category - Filter by category
// ============================================================================
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    // TODO: Replace with actual API call
    // const response = await api.get("/products")
    // return response.data
    
    // Temporary mock data - REMOVE when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS)
      }, 500)
    })
  },

  getById: async (id: string): Promise<Product> => {
    // TODO: Replace with actual API call
    // const response = await api.get(`/products/${id}`)
    // return response.data
    
    // Temporary mock data - REMOVE when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = MOCK_PRODUCTS.find((p) => p.id === id)
        resolve(product || MOCK_PRODUCTS[0])
      }, 500)
    })
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    // TODO: Replace with actual API call
    // const response = await api.get(`/products?category=${category}`)
    // return response.data
    
    // Temporary mock data - REMOVE when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS.filter((p) => p.category === category))
      }, 500)
    })
  },
}

// ============================================================================
// AUTH APIs
// ============================================================================
// Expected endpoints:
// - POST /auth/signup - Register new user
// - POST /auth/login - Login user
// - POST /auth/logout - Logout user
// ============================================================================
export const authAPI = {
  signup: async (email: string, password: string, name: string): Promise<User> => {
    const response = await api.post("/auth/signup", { email, password, name })
    // Store token if provided by backend
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token)
    }
    return response.data.user || response.data
  },

  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/login", { email, password })
    // Store token if provided by backend
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token)
    }
    return response.data.user || response.data
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  },
}

// ============================================================================
// ORDER/CHECKOUT API
// ============================================================================
// This is called from app/checkout/page.tsx
// Expected endpoint:
// - POST /orders/checkout - Create new order
// ============================================================================
export const orderAPI = {
  createOrder: async (orderData: {
    items: Array<{ productId: string; size: string; quantity: number; price: number }>
    customer: {
      fullName: string
      email: string
      phone: string
      address: string
      city: string
      state: string
    }
    paymentMethod: "paystack" | "flutterwave"
    subtotal: number
    shipping: number
    total: number
  }) => {
    const response = await api.post("/orders/checkout", orderData)
    return response.data
  },
}

// ============================================================================
// NEWSLETTER API
// ============================================================================
// This is called from app/page.tsx (newsletter form)
// Expected endpoint:
// - POST /newsletter/subscribe - Subscribe to newsletter
// ============================================================================
export const newsletterAPI = {
  subscribe: async (email: string): Promise<void> => {
    await api.post("/newsletter/subscribe", { email })
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
