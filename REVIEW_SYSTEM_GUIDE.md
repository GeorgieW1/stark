# 📝 Review System Implementation Guide

This document explains how the review system works and what the backend needs to implement.

---

## 🗄️ Database Relationships

Based on your database structure:
- **Product → Reviews (1 → *)**: One product can have many reviews
- **User → Reviews (1 → *)**: One user can write many reviews

---

## 📤 Frontend Sends (What Backend Receives)

### **1. Get Reviews for a Product**

**Endpoint:** `GET /products/:productId/reviews`

**Request:** No body, just URL parameter

**Expected Response:**
```json
[
  {
    "id": "review-123",
    "productId": "1",
    "userId": "user-456",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "rating": 5,
    "comment": "Amazing quality! Fits perfectly and looks great.",
    "createdAt": "2024-01-30T10:00:00Z",
    "updatedAt": "2024-01-30T10:00:00Z",
    "verifiedPurchase": true
  }
]
```

---

### **2. Create a New Review**

**Endpoint:** `POST /products/:productId/reviews`

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Amazing quality! Fits perfectly and looks great.",
  "userName": "John Doe",
  "userEmail": "john@example.com"
}
```

**Expected Response:**
```json
{
  "id": "review-123",
  "productId": "1",
  "userId": "user-456", // Backend generates/assigns this
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "rating": 5,
  "comment": "Amazing quality! Fits perfectly and looks great.",
  "createdAt": "2024-01-30T10:00:00Z",
  "verifiedPurchase": false // Backend checks if user purchased this product
}
```

---

### **3. Update a Review**

**Endpoint:** `PUT /reviews/:reviewId`

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

**Expected Response:**
```json
{
  "id": "review-123",
  "productId": "1",
  "userId": "user-456",
  "userName": "John Doe",
  "rating": 4,
  "comment": "Updated comment",
  "createdAt": "2024-01-30T10:00:00Z",
  "updatedAt": "2024-01-30T11:00:00Z"
}
```

**Note:** Backend should verify that the user owns this review before allowing update.

---

### **4. Delete a Review**

**Endpoint:** `DELETE /reviews/:reviewId`

**Request:** No body

**Expected Response:** `204 No Content` or `200 OK` with success message

**Note:** Backend should verify that the user owns this review before allowing deletion.

---

## 📋 Review Data Structure

### **Review Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique review ID (backend generates) |
| `productId` | string | ✅ Yes | ID of the product being reviewed |
| `userId` | string | ✅ Yes | ID of the user who wrote the review |
| `userName` | string | ✅ Yes | Display name of the reviewer |
| `userEmail` | string | ❌ Optional | Email of the reviewer |
| `rating` | number | ✅ Yes | Rating from 1-5 stars |
| `comment` | string | ✅ Yes | Review text/comment |
| `createdAt` | string (ISO 8601) | ✅ Yes | When review was created |
| `updatedAt` | string (ISO 8601) | ❌ Optional | When review was last updated |
| `verifiedPurchase` | boolean | ❌ Optional | Whether reviewer purchased the product |

---

## 🔄 Review Flow

### **1. Displaying Reviews:**
```
User visits product page
  ↓
Frontend calls: GET /products/:productId/reviews
  ↓
Backend returns: Array of Review objects
  ↓
Frontend displays reviews with ratings and comments
```

### **2. Submitting a Review:**
```
User fills review form (rating, comment, name, email)
  ↓
Frontend calls: POST /products/:productId/reviews
  ↓
Backend:
  - Validates rating (1-5)
  - Validates comment (not empty)
  - Creates Review record in database
  - Links to Product and User
  - Checks if user purchased product (for verifiedPurchase flag)
  ↓
Backend returns: Created Review object
  ↓
Frontend adds review to list immediately
```

### **3. Updating a Review:**
```
User clicks "Edit Review"
  ↓
Frontend calls: PUT /reviews/:reviewId
  ↓
Backend:
  - Verifies user owns the review
  - Updates rating and/or comment
  - Updates updatedAt timestamp
  ↓
Backend returns: Updated Review object
```

### **4. Deleting a Review:**
```
User clicks "Delete Review"
  ↓
Frontend calls: DELETE /reviews/:reviewId
  ↓
Backend:
  - Verifies user owns the review
  - Deletes Review record
  ↓
Backend returns: Success response
```

---

## ⚠️ Important Notes for Backend Developer

### **1. User Identification:**
- Currently, frontend doesn't require authentication
- Backend can:
  - Create anonymous reviews (no userId required)
  - Or require user authentication for reviews
  - Use `userEmail` to identify users if no auth system

### **2. Verified Purchase:**
- Backend should check if `userEmail` matches any completed orders for this `productId`
- Set `verifiedPurchase: true` if user has purchased the product
- This adds credibility to reviews

### **3. Rating Validation:**
- Rating must be between 1 and 5
- Return `400 Bad Request` if invalid

### **4. Comment Validation:**
- Comment should not be empty
- Consider minimum length (e.g., 10 characters)
- Consider maximum length (e.g., 1000 characters)
- Return `400 Bad Request` if invalid

### **5. Spam Prevention:**
- Consider rate limiting (e.g., 1 review per product per user)
- Consider requiring email verification
- Consider moderation queue for new reviews

### **6. Average Rating Calculation:**
- Frontend calculates average rating from reviews
- Backend can also calculate and store in Product table for performance
- Update average rating whenever a review is added/updated/deleted

---

## 📊 Example C# Models

```csharp
public class Review
{
    public string Id { get; set; }
    public string ProductId { get; set; }
    public string UserId { get; set; } // Can be null for anonymous reviews
    public string UserName { get; set; }
    public string? UserEmail { get; set; }
    public int Rating { get; set; } // 1-5
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool VerifiedPurchase { get; set; }
}

public class CreateReviewRequest
{
    public int Rating { get; set; }
    public string Comment { get; set; }
    public string UserName { get; set; }
    public string? UserEmail { get; set; }
}

public class UpdateReviewRequest
{
    public int? Rating { get; set; }
    public string? Comment { get; set; }
}
```

---

## 🎯 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/products/:productId/reviews` | Get all reviews for a product | ❌ No |
| `POST` | `/products/:productId/reviews` | Create a new review | ❌ No (or ✅ Yes) |
| `PUT` | `/reviews/:reviewId` | Update a review | ✅ Yes (verify ownership) |
| `DELETE` | `/reviews/:reviewId` | Delete a review | ✅ Yes (verify ownership) |

---

## ✅ Frontend Implementation Status

- ✅ Review types defined (`lib/types.ts`)
- ✅ Review API functions (`services/api.ts`)
- ✅ Review list component (`components/review-list.tsx`)
- ✅ Review form component (`components/review-form.tsx`)
- ✅ Reviews section on product page (`app/product/[id]/page.tsx`)
- ✅ Star rating display
- ✅ Average rating calculation
- ✅ Verified purchase badge
- ✅ Review submission form

**Frontend is ready!** Just needs backend endpoints to be implemented.

---

**Last Updated:** 2024-01-30

