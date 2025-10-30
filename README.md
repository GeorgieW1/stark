# LagosWear - Premium Nigerian Streetwear MVP

A modern, high-end e-commerce platform for a Nigerian streetwear fashion brand built with React, TypeScript, and Next.js.

## Features

- **Landing Page**: Hero section with bold tagline, featured collections carousel, and CTAs
- **Product Listing**: Filterable product grid with category filters (men, women, unisex)
- **Product Details**: Large image gallery, size selection, quantity controls, and add to cart
- **Shopping Cart**: Item management with quantity controls and order summary
- **Checkout**: Complete checkout flow with shipping and payment method selection
- **Collections**: Curated product collections with immersive layouts
- **Smooth Animations**: Framer Motion animations throughout for a premium feel
- **Responsive Design**: Mobile-first design that works beautifully on all devices
- **Global State**: React Context for cart and user data management

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: React Context API
- **API Calls**: Axios (with placeholder mock data)

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── shop/
│   │   └── page.tsx            # Product listing with filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx        # Product details page
│   ├── cart/
│   │   └── page.tsx            # Shopping cart
│   ├── checkout/
│   │   ├── page.tsx            # Checkout form
│   │   └── success/
│   │       └── page.tsx        # Order confirmation
│   ├── collections/
│   │   └── page.tsx            # Collections showcase
│   ├── about/
│   │   └── page.tsx            # About page
│   └── globals.css             # Global styles and Tailwind config
├── components/
│   ├── navbar.tsx              # Navigation with cart indicator
│   ├── footer.tsx              # Footer with links and social
│   ├── product-card.tsx        # Reusable product card component
│   └── ui/                     # shadcn/ui components
├── context/
│   └── cart-context.tsx        # Cart state management
├── services/
│   └── api.ts                  # API service layer with mock data
├── lib/
│   └── types.ts                # TypeScript type definitions
└── public/                     # Static assets and images
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the ZIP file

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Integrating Backend APIs

The frontend is ready to integrate with your C backend APIs. Here's how:

### 1. Update API Base URL

In `services/api.ts`, update the `API_BASE_URL`:

\`\`\`typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://your-backend-url/api"
\`\`\`

Add to your `.env.local` file:
\`\`\`
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
\`\`\`

### 2. Replace Mock Data

The `services/api.ts` file contains placeholder functions. Replace them with actual API calls:

\`\`\`typescript
// Current (mock):
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 500)
    })
  },
}

// Replace with:
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
  },
}
\`\`\`

### 3. Authentication Integration

When your auth endpoints are ready, update `authAPI` in `services/api.ts`:

\`\`\`typescript
export const authAPI = {
  signup: async (email: string, password: string, name: string): Promise<User> => {
    const response = await api.post("/auth/signup", { email, password, name })
    // Store token in localStorage or cookies
    localStorage.setItem("token", response.data.token)
    return response.data.user
  },
  
  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/login", { email, password })
    localStorage.setItem("token", response.data.token)
    return response.data.user
  },
}
\`\`\`

### 4. Payment Integration

For Paystack/Flutterwave integration, update the checkout submission in `app/checkout/page.tsx`:

\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    // Initialize payment with your backend
    const response = await api.post("/checkout/initialize", {
      ...formData,
      items,
      totalPrice: finalTotal,
    })

    // Redirect to payment gateway
    window.location.href = response.data.paymentUrl
  } catch (error) {
    console.error("Checkout error:", error)
    // Handle error
  } finally {
    setLoading(false)
  }
}
\`\`\`

## Extending the MVP

### Adding Admin Dashboard

1. Create `app/admin/` directory
2. Add authentication middleware
3. Build pages for:
   - Product management (CRUD)
   - Order management
   - User management
   - Analytics dashboard

### Adding Order Tracking

1. Create `app/orders/[id]/page.tsx`
2. Add order status API endpoints
3. Implement real-time updates with WebSockets or polling

### Adding User Profiles

1. Create `app/profile/page.tsx`
2. Add user context for authentication state
3. Implement protected routes
4. Add order history and saved addresses

### Adding Wishlist

1. Create wishlist context similar to cart context
2. Add wishlist API endpoints
3. Update product cards with wishlist toggle
4. Create `app/wishlist/page.tsx`

## Design System

### Colors
- **Primary**: `#f4b5c1` (Soft Pink)
- **Background**: `#000000` (Black)
- **Text**: `#ffffff` (White)
- **Muted**: `#262626` (Dark Grey)
- **Accent**: `#a3a3a3` (Light Grey)

### Typography
- **Headings**: Outfit (via Google Fonts)
- **Body**: Outfit (via Google Fonts)

### Spacing
- Uses Tailwind's default spacing scale
- Consistent padding: `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-12` or `py-20`

## Performance Optimization

- Images are optimized with Next.js Image component
- Code splitting with dynamic imports
- Lazy loading for below-the-fold content
- Memoization for expensive computations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Support

For questions or issues, contact the development team.
