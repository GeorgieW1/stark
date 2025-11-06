# API Integration Guide for STARK Website

This guide shows your C# backend developer exactly where to integrate API endpoints.

> 📋 **See `FRONTEND_TO_BACKEND_DATA.md` for detailed explanation of what data is sent and received**

## 🚀 Quick Start

### 1. Set API Base URL

**File:** `.env.local` (create this file in project root)

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
```

**OR** for production, add to Vercel environment variables:
- Variable name: `NEXT_PUBLIC_API_BASE_URL`
- Value: `https://your-production-api.com/api`

---

## 📍 API Integration Points

### **1. Main API Configuration**

**File:** `services/api.ts` (Line 4)

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"
```

**Current Status:** ✅ Already configured - just add your API URL to `.env.local`

---

### **2. Product APIs** 

**File:** `services/api.ts` (Lines 14-42)

**Current Status:** Using mock data - needs real API integration

#### **Required Endpoints:**

```typescript
// ✅ GET /products - Get all products
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
  },

  // ✅ GET /products/:id - Get single product
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // ✅ GET /products?category=unisex - Filter by category
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products?category=${category}`)
    return response.data
  },
}
```

**Where Used:**
- `app/page.tsx` - Home page featured products
- `app/shop/page.tsx` - Shop page product listing
- `app/product/[id]/page.tsx` - Product detail page

**Expected Response Format:**

```json
{
  "id": "string",
  "name": "string",
  "price": number,
  "description": "string",
  "category": "men" | "women" | "unisex",
  "images": ["string"],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "inStock": boolean,
  "featured": boolean
}
```

---

### **3. Authentication APIs**

**File:** `services/api.ts` (Lines 44-59)

**Current Status:** ✅ Already configured - just needs backend endpoints

#### **Required Endpoints:**

```typescript
export const authAPI = {
  // ✅ POST /auth/signup
  signup: async (email: string, password: string, name: string): Promise<User> => {
    const response = await api.post("/auth/signup", { email, password, name })
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data.user
  },

  // ✅ POST /auth/login
  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post("/auth/login", { email, password })
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data.user
  },

  // ✅ POST /auth/logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
    localStorage.removeItem("token")
  },
}
```

**Expected Response Format:**

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string" // Optional - for JWT auth
}
```

---

### **4. Checkout/Order API**

**File:** `app/checkout/page.tsx` (Line 57-98)

**Current Status:** ✅ Ready - Backend needs to implement endpoint

#### **Required Endpoint:**

```typescript
// ✅ POST /orders/checkout
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validation...
  
  setLoading(true)

  try {
    const response = await api.post("/orders/checkout", {
      items: items.map(item => ({
        productId: item.product.id,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price
      })),
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
      },
      paymentMethod: formData.paymentMethod, // "paystack", "flutterwave", or "verge"
      subtotal: totalPrice,
      shipping: shippingFee,
      total: finalTotal,
    })

    // If payment gateway URL provided (for Paystack, Flutterwave, or Verge)
    if (response.data.paymentUrl) {
      window.location.href = response.data.paymentUrl
    } else if (response.data.orderId) {
      // If order created successfully without redirect
      clearCart()
      router.push(`/checkout/success?orderId=${response.data.orderId}`)
    }
  } catch (error) {
    console.error("Checkout error:", error)
    alert("There was an error processing your order. Please try again.")
  } finally {
    setLoading(false)
  }
}
```

**Expected Request Format:**

```json
{
  "items": [
    {
      "productId": "string",
      "size": "string",
      "quantity": number,
      "price": number
    }
  ],
  "customer": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string"
  },
  "paymentMethod": "paystack" | "flutterwave",
  "subtotal": number,
  "shipping": number,
  "total": number
}
```

**Expected Response Format:**

```json
{
  "orderId": "string", // Required - Backend generates this
  "paymentUrl": "string", // Required for Paystack/Flutterwave/Verge - URL to redirect user to payment
  "status": "pending" | "processing" | "completed"
}
```

**For Verge Payment:**
- Backend should generate order ID
- Backend calls Verge InvokePayment API
- Backend returns `payPageLink` from Verge as `paymentUrl`
- Frontend redirects user to Verge payment page
- Verge redirects back to `/checkout/verge-callback?Id={transactionId}&Status={status}`
- Frontend handles success/failure on callback page

---

### **5. Newsletter API**

**File:** `app/page.tsx` (Line 245-254)

**Current Status:** Using console.log - needs real API

#### **Required Endpoint:**

```typescript
// ✅ POST /newsletter/subscribe
onSubmit={(e) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const email = formData.get("email") as string
  
  try {
    await api.post("/newsletter/subscribe", { email })
    alert("Thank you for subscribing! Check your email for confirmation.")
    e.currentTarget.reset()
  } catch (error) {
    alert("Failed to subscribe. Please try again.")
  }
}}
```

**Expected Request:**

```json
{
  "email": "user@example.com"
}
```

---

## 🔐 Authentication Headers

If your API requires authentication tokens, update `services/api.ts`:

```typescript
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)
```

---

## 📋 Complete API Endpoint Summary

| Endpoint | Method | File | Status |
|----------|--------|------|--------|
| `/products` | GET | `services/api.ts` | ⚠️ Needs integration |
| `/products/:id` | GET | `services/api.ts` | ⚠️ Needs integration |
| `/products?category=:cat` | GET | `services/api.ts` | ⚠️ Needs integration |
| `/auth/signup` | POST | `services/api.ts` | ✅ Ready |
| `/auth/login` | POST | `services/api.ts` | ✅ Ready |
| `/auth/logout` | POST | `services/api.ts` | ✅ Ready |
| `/orders/checkout` | POST | `app/checkout/page.tsx` | ✅ Ready - Backend needs to implement |
| `/checkout/verge-callback` | GET | `app/checkout/verge-callback/page.tsx` | ✅ Ready - Handles Verge redirect |
| `/newsletter/subscribe` | POST | `app/page.tsx` | ⚠️ Needs integration |

---

## 💳 Verge Payment Gateway Integration

### **Frontend Implementation Status:** ✅ Complete

**What Frontend Does:**
1. ✅ Shows Verge as payment option in checkout
2. ✅ Sends order data to backend with `paymentMethod: "verge"`
3. ✅ Receives `paymentUrl` from backend
4. ✅ Redirects user to Verge payment page
5. ✅ Handles Verge redirect back to `/checkout/verge-callback`
6. ✅ Shows success/failure based on Verge response

**What Backend Needs to Do:**
1. ⚠️ Receive order data from frontend
2. ⚠️ Generate unique order ID (TraceId for Verge)
3. ⚠️ Call Verge Authentication API to get token & key
4. ⚠️ Generate signature: `Sha256(MerchantId + TraceId + TimeStamp + Key)`
5. ⚠️ Call Verge InvokePayment API with order details
6. ⚠️ Return `payPageLink` from Verge as `paymentUrl` to frontend
7. ⚠️ Create callback endpoint to receive Verge webhook notifications
8. ⚠️ Verify signature on callback
9. ⚠️ Update order status based on payment result

**Verge Callback URL Setup:**
- Frontend callback page: `/checkout/verge-callback` (handles user redirect)
- Backend webhook endpoint: Your backend URL (e.g., `https://your-api.com/api/webhooks/verge`)
- Set `returnUrl` in Verge InvokePayment to: `https://your-site.com/checkout/verge-callback`
- Set webhook URL in Verge merchant dashboard to your backend endpoint

**Verge Payment Flow:**
```
1. User selects Verge → Frontend sends order to Backend
2. Backend creates order → Generates order ID
3. Backend calls Verge API → Gets payment URL
4. Backend returns payment URL → Frontend redirects user
5. User pays on Verge → Verge redirects to /checkout/verge-callback
6. Verge sends webhook → Backend updates order status
7. Frontend shows success/failure → Based on redirect params
```

**Important Notes for Backend Developer:**
- Order ID from frontend should be used as `traceId` in Verge API
- `returnUrl` should be: `https://your-domain.com/checkout/verge-callback`
- Verge will redirect with query params: `?Id={transactionId}&Status={status}`
- ResponseCode "00" = Success, anything else = Failed
- Backend should verify payment via webhook (more reliable than redirect)

---

## 🗄️ Database Relationships (Backend Schema)

The backend developer has confirmed the following database relationships:

| Relationship             | Type             | Status    |
| ------------------------ | ---------------- | --------- |
| **Category → Products**  | 1 → *            | ✅ Correct |
| **User → Orders**        | 1 → *            | ✅ Correct |
| **Order → OrderItems**   | 1 → *            | ✅ Correct |
| **Product → OrderItems**  | 1 → *            | ✅ Correct |
| **User → Cart**          | 1 → 1            | ✅ Correct |
| **Cart → CartItems**     | 1 → *            | ✅ Correct |
| **Product → CartItems**   | 1 → *            | ✅ Correct |
| **Product → Reviews**    | 1 → *            | ✅ Correct |
| **User → Reviews**       | 1 → *            | ✅ Correct |
| **Order → Payment**      | 1 → 1            | ✅ Correct |
| **User → Payments**      | 1 → * (optional) | ✅ Correct |

### **Understanding the Relationships:**

- **Category → Products (1 → *)**: One category can have many products
- **User → Orders (1 → *)**: One user can have many orders
- **Order → OrderItems (1 → *)**: One order contains many order items
- **Product → OrderItems (1 → *)**: One product can appear in many order items
- **User → Cart (1 → 1)**: Each user has exactly one cart
- **Cart → CartItems (1 → *)**: One cart contains many cart items
- **Product → CartItems (1 → *)**: One product can appear in many cart items (different users)
- **Product → Reviews (1 → *)**: One product can have many reviews
- **User → Reviews (1 → *)**: One user can write many reviews
- **Order → Payment (1 → 1)**: Each order has exactly one payment record
- **User → Payments (1 → *)**: One user can have many payments (optional, if tracking payment history)

### **Frontend Implications:**

- When fetching products, the backend may include category information
- When creating an order, the backend will create OrderItems for each product
- Cart is user-specific (if authentication is implemented)
- Reviews can be fetched per product or per user

---

## 🧪 Testing

1. **Local Development:**
   ```bash
   # Create .env.local
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api" > .env.local
   
   # Start dev server
   npm run dev
   ```

2. **Check Network Tab:**
   - Open browser DevTools → Network tab
   - All API calls should go to your backend URL

---

## 📝 Next Steps

1. ✅ Add `NEXT_PUBLIC_API_BASE_URL` to `.env.local`
2. ⚠️ Replace mock product API calls with real endpoints
3. ⚠️ Implement checkout API endpoint
4. ⚠️ Implement newsletter subscription endpoint
5. ⚠️ Test all endpoints with real backend

---

## 📚 API Documentation

### **Who Should Send What?**

**Frontend Developer (You) has already created:**
- ✅ `API_INTEGRATION_GUIDE.md` - This file with endpoint specifications
- ✅ `services/api.ts` - Frontend code showing expected request/response formats
- ✅ TypeScript types in `lib/types.ts` - Data structures expected

**Backend Developer Should Provide:**
- 📄 **Their own API documentation** (if different from this guide)
- 📄 **Actual endpoint URLs** (may differ from what's expected)
- 📄 **Authentication method** (if using JWT tokens, API keys, etc.)
- 📄 **Response format examples** (actual JSON responses from their API)
- 📄 **Error codes and messages** (how errors are structured)
- 📄 **Rate limiting** (if applicable)
- 📄 **CORS configuration** (to allow frontend to call backend)

**Recommendation:**
1. Share `API_INTEGRATION_GUIDE.md` with your backend developer
2. Ask them to review it and confirm if their endpoints match
3. If different, ask them to provide their API documentation
4. Update `services/api.ts` based on their actual API structure

---

## 🆘 Need Help?

If backend developer needs clarification:
- Check `services/api.ts` for current implementation
- Check `lib/types.ts` for TypeScript interfaces
- All API calls use Axios (already configured)

---

**Last Updated:** $(date)

