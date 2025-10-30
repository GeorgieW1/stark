"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, Product } from "@/lib/types"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string, quantity?: number) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, size: string, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id && item.size === size)

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prev, { product, size, quantity }]
    })
  }

  const removeItem = (productId: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)))
  }

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size)
      return
    }

    setItems((prev) =>
      prev.map((item) => (item.product.id === productId && item.size === size ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
