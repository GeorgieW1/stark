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
  paymentMethod: "paystack" | "flutterwave"
}
