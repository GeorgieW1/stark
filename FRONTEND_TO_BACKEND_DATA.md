# 📤 What Frontend Sends → 📥 What Backend Receives

## API Endpoint

**Method:** `POST`  
**URL:** `{API_BASE_URL}/orders/checkout`  
**Content-Type:** `application/json`

---

## 📤 What YOU (Frontend) Are Sending

When a user clicks "Complete Order" on the checkout page, the frontend sends this JSON payload:

```json
{
  "items": [
    {
      "productId": "1",
      "size": "M",
      "quantity": 2,
      "price": 45000
    },
    {
      "productId": "3",
      "size": "L",
      "quantity": 1,
      "price": 65000
    }
  ],
  "customer": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+234 800 000 0000",
    "address": "123 Main Street",
    "city": "Lagos",
    "state": "Lagos"
  },
  "paymentMethod": "verge",
  "subtotal": 155000,
  "shipping": 0,
  "total": 155000
}
```

### Field Breakdown:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `items` | Array | List of products in cart | See below |
| `items[].productId` | string | Product ID | `"1"` |
| `items[].size` | string | Size selected | `"M"`, `"L"`, `"XL"` |
| `items[].quantity` | number | How many of this item | `2` |
| `items[].price` | number | Price per unit (in Naira) | `45000` |
| `customer.fullName` | string | Customer's full name | `"John Doe"` |
| `customer.email` | string | Customer's email | `"john@example.com"` |
| `customer.phone` | string | Customer's phone number | `"+234 800 000 0000"` |
| `customer.address` | string | Street address | `"123 Main Street"` |
| `customer.city` | string | City | `"Lagos"` |
| `customer.state` | string | State | `"Lagos"` |
| `paymentMethod` | string | Always `"verge"` | `"verge"` |
| `subtotal` | number | Total before shipping | `155000` |
| `shipping` | number | Shipping fee (0 if order > ₦50,000) | `0` or `3000` |
| `total` | number | Final total (subtotal + shipping) | `155000` |

---

## 📥 What Backend Developer Receives

The backend developer will receive this exact JSON structure in the request body when they implement:

```csharp
// C# Example (since backend dev uses C#)
[HttpPost("orders/checkout")]
public async Task<IActionResult> CreateOrder([FromBody] CheckoutRequest request)
{
    // request.Items - array of order items
    // request.Customer - customer information
    // request.PaymentMethod - always "verge"
    // request.Subtotal, Shipping, Total - pricing breakdown
    
    // Backend should:
    // 1. Generate unique Order ID (TraceId for Verge)
    // 2. Save order to database
    // 3. Call Verge Payment API
    // 4. Return payment URL to frontend
}
```

### Example C# Model (for backend dev):

```csharp
public class CheckoutRequest
{
    public List<OrderItem> Items { get; set; }
    public CustomerInfo Customer { get; set; }
    public string PaymentMethod { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Shipping { get; set; }
    public decimal Total { get; set; }
}

public class OrderItem
{
    public string ProductId { get; set; }
    public string Size { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

public class CustomerInfo
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
}
```

---

## 📤 What Backend Should Return

After processing the order and calling Verge API, backend should return:

```json
{
  "orderId": "STARK-123456789",
  "paymentUrl": "https://testdev.coralpay.com/payment/00998833",
  "status": "pending"
}
```

### Response Fields:

| Field | Type | Required | Description |
|-------|------|-----------|-------------|
| `orderId` | string | ✅ Yes | Unique order ID (backend generates this) |
| `paymentUrl` | string | ✅ Yes | Verge payment page URL (from Verge's `payPageLink`) |
| `status` | string | Optional | Order status: `"pending"`, `"processing"`, etc. |

### Example C# Response Model:

```csharp
public class CheckoutResponse
{
    public string OrderId { get; set; }
    public string PaymentUrl { get; set; }
    public string Status { get; set; } = "pending";
}
```

---

## 🔄 Complete Flow

```
1. User fills checkout form → Frontend collects data
2. User clicks "Complete Order" → Frontend sends POST request
3. Backend receives order data → Saves to database
4. Backend generates Order ID → Uses as TraceId for Verge
5. Backend calls Verge API → Gets payment URL
6. Backend returns response → { orderId, paymentUrl }
7. Frontend receives response → Redirects user to paymentUrl
8. User pays on Verge → Verge redirects to /checkout/verge-callback
9. Backend receives webhook → Updates order status
```

---

## ⚠️ Important Notes for Backend Developer

1. **Order ID Generation:**
   - Backend must generate a unique Order ID
   - This Order ID should be used as `traceId` in Verge API call
   - Format can be anything (e.g., `"STARK-123456789"` or UUID)

2. **Verge Integration:**
   - Backend calls Verge `InvokePayment` API
   - Use Order ID as `traceId` in Verge request
   - Set `returnUrl` to: `https://your-domain.com/checkout/verge-callback`
   - Return Verge's `payPageLink` as `paymentUrl` in response

3. **Error Handling:**
   - If order creation fails, return HTTP 400/500 with error message
   - If Verge API fails, return HTTP 500 with error message
   - Frontend will show error message to user

4. **CORS Configuration:**
   - Backend must allow requests from frontend domain
   - Add frontend URL to CORS allowed origins

---

## 📝 Example Real Request/Response

### Request (what frontend sends):
```http
POST /api/orders/checkout HTTP/1.1
Host: your-backend-api.com
Content-Type: application/json

{
  "items": [
    {
      "productId": "1",
      "size": "M",
      "quantity": 1,
      "price": 45000
    }
  ],
  "customer": {
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "08012345678",
    "address": "456 Victoria Island",
    "city": "Lagos",
    "state": "Lagos"
  },
  "paymentMethod": "verge",
  "subtotal": 45000,
  "shipping": 3000,
  "total": 48000
}
```

### Response (what backend should return):
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "orderId": "STARK-20240130-ABC123",
  "paymentUrl": "https://testdev.coralpay.com/payment/00998833",
  "status": "pending"
}
```

---

**Last Updated:** 2024-01-30

