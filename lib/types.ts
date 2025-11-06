export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: "men" | "women" | "unisex"
  images: string[]
  sizes: string[]
  inStock: boolean
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  paymentMethod: "verge"
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userEmail?: string
  rating: number // 1-5 stars
  comment: string
  createdAt: string
  updatedAt?: string
  verifiedPurchase?: boolean // Whether user actually purchased the product
}

export interface ProductWithReviews extends Product {
  reviews?: Review[]
  averageRating?: number
  totalReviews?: number
}
