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
  timeout: 30000, // 30 seconds timeout
})

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    }
    return config
  },
  (error) => {
    console.error("[API] Request error:", error)
    return Promise.reject(error)
  }
)

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

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    if (error.code === "ERR_NETWORK") {
      console.error("[API] Network Error - Check if backend is running and API_BASE_URL is correct:", API_BASE_URL)
      console.error("[API] Make sure backend server is running and CORS is configured")
    }

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
    paymentMethod: "verge"
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

// ============================================================================
// REVIEW API
// ============================================================================
// Expected endpoints:
// - GET /products/:id/reviews - Get reviews for a product
// - POST /products/:id/reviews - Create a new review
// - PUT /reviews/:id - Update a review
// - DELETE /reviews/:id - Delete a review
// ============================================================================
import type { Review } from "@/lib/types"

export const reviewAPI = {
  // Get all reviews for a product
  getByProductId: async (productId: string): Promise<Review[]> => {
    const response = await api.get(`/products/${productId}/reviews`)
    return response.data
  },

  // Create a new review
  create: async (productId: string, reviewData: {
    rating: number
    comment: string
    userName: string
    userEmail?: string
  }): Promise<Review> => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData)
    return response.data
  },

  // Update a review (if user owns it)
  update: async (reviewId: string, reviewData: {
    rating?: number
    comment?: string
  }): Promise<Review> => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData)
    return response.data
  },

  // Delete a review (if user owns it)
  delete: async (reviewId: string): Promise<void> => {
    await api.delete(`/reviews/${reviewId}`)
  },
}

const MOCK_PRODUCTS: Product[] = [
  // Unisex Products (Featured)
  {
    id: "1",
    name: "VORTEX Pink Embroidered Hoodie",
    price: 45000,
    description:
      "Premium oversized hoodie with embroidered VORTEX branding. Soft cotton blend with a relaxed fit. Available in pink with grey accents.",
    category: "unisex",
    images: ["/vortex-hoodie-pink.jpg", "/vortex-hoodie-pink-detail.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "VORTEX Black Embroidered Hoodie",
    price: 45000,
    description:
      "Classic black oversized hoodie with embroidered VORTEX logo. Premium heavyweight cotton for durability and comfort.",
    category: "unisex",
    images: ["/vortex-hoodie-black.jpg", "/vortex-hoodie-black-detail.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "VORTEX Burgundy Tracksuit",
    price: 65000,
    description:
      "Complete tracksuit set in rich burgundy. Includes matching hoodie and joggers with embroidered VORTEX branding. Perfect for lifestyle wear.",
    category: "unisex",
    images: ["/vortex-tracksuit-burgundy.jpg", "/vortex-tracksuit-burgundy-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "VORTEX Cream Oversized Hoodie",
    price: 45000,
    description:
      "Minimalist cream-colored hoodie with subtle VORTEX embroidery. Versatile piece that pairs with any outfit.",
    category: "unisex",
    images: ["/vortex-hoodie-cream.jpg", "/vortex-hoodie-cream-detail.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "VORTEX Black Tracksuit",
    price: 65000,
    description:
      "Premium black tracksuit with embroidered VORTEX branding. Includes hoodie and matching joggers. Unisex fit.",
    category: "unisex",
    images: ["/vortex-tracksuit-black.jpg", "/vortex-tracksuit-black-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  // Men's Products
  {
    id: "9",
    name: "VORTEX Men's Black Bomber Jacket",
    price: 55000,
    description:
      "Stylish bomber jacket with VORTEX patches. Perfect for streetwear enthusiasts. Premium quality with modern design.",
    category: "men",
    images: ["/vortex-jacket-bomber.jpg", "/vortex-jacket-bomber-back.jpg"],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "10",
    name: "VORTEX Men's Black Cargo Pants",
    price: 40000,
    description:
      "Utility cargo pants with multiple pockets. Comfortable fit for everyday wear. Perfect for street style.",
    category: "men",
    images: ["/vortex-pants-cargo.jpg", "/vortex-pants-cargo-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "11",
    name: "VORTEX Men's Oversized T-Shirt",
    price: 28000,
    description:
      "Bold graphic t-shirt with VORTEX branding. Oversized fit for modern streetwear look.",
    category: "men",
    images: ["/vortex-tshirt-oversized.jpg", "/vortex-tshirt-oversized-back.jpg"],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "12",
    name: "VORTEX Men's Black Premium Hoodie",
    price: 48000,
    description:
      "Premium hoodie with Lagos skyline embroidery. Unique design celebrating Nigerian culture.",
    category: "men",
    images: ["/vortex-hoodie-lagos.jpg", "/vortex-hoodie-lagos-back.jpg"],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
  },
  // Women's Products
  {
    id: "13",
    name: "VORTEX Women's Pink Crop Top",
    price: 25000,
    description:
      "Minimalist pink crop top with VORTEX branding. Perfect for layering or wearing solo. Streetwear meets fashion.",
    category: "women",
    images: ["/vortex-croptop-pink.jpg", "/vortex-croptop-lifestyle.jpg"],
    sizes: ["S", "M", "L"],
    inStock: true,
    featured: true,
  },
  {
    id: "14",
    name: "VORTEX Women's Black Hoodie",
    price: 45000,
    description:
      "Classic black hoodie designed for women. Comfortable fit with VORTEX embroidery. Versatile wardrobe essential.",
    category: "women",
    images: ["/vortex-hoodie-women-black.jpg", "/vortex-hoodie-women-black-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "15",
    name: "VORTEX Women's Grey Hoodie",
    price: 45000,
    description:
      "Elegant grey hoodie with pink accents. Perfect for everyday wear with streetwear edge.",
    category: "women",
    images: ["/vortex-hoodie-women-grey.jpg", "/vortex-hoodie-women-grey-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "16",
    name: "VORTEX Women's Tracksuit Set",
    price: 68000,
    description:
      "Complete tracksuit set for women. Premium quality with comfortable fit. Perfect for active lifestyle.",
    category: "women",
    images: ["/vortex-tracksuit-women.jpg", "/vortex-tracksuit-women-lifestyle.jpg"],
    sizes: ["S", "M", "L"],
    inStock: true,
  },
  // Additional Unisex Products
  {
    id: "6",
    name: "VORTEX Grey Embroidered Hoodie",
    price: 45000,
    description:
      "Soft grey hoodie with embroidered VORTEX logo and pink accents. Comfortable oversized fit for everyday wear.",
    category: "unisex",
    images: ["/vortex-hoodie-grey.jpg", "/vortex-hoodie-grey-detail.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "7",
    name: "VORTEX Black Joggers",
    price: 35000,
    description:
      "Premium black joggers with embroidered VORTEX branding. Comfortable fit with tapered ankles. Perfect for casual or athletic wear.",
    category: "unisex",
    images: ["/vortex-joggers-black.jpg", "/vortex-joggers-black-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "8",
    name: "VORTEX Cream Tracksuit",
    price: 65000,
    description:
      "Elegant cream tracksuit set with embroidered VORTEX logo. Includes hoodie and joggers. Versatile neutral tone.",
    category: "unisex",
    images: ["/vortex-tracksuit-cream.jpg", "/vortex-tracksuit-cream-detail.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
]
