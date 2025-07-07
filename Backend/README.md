# 🚀 User Registration Endpoint Documentation

## 📌 POST /users/register

This endpoint allows a new user to register on the platform. Upon successful registration, the user receives a **JWT token** for authentication and their user details (minus the password, of course — we’re not reckless).

---

## 📝 Description

The `/users/register` endpoint handles the creation of a new user account. It:

- Validates the request body using `express-validator`.
- Hashes the password securely using bcrypt.
- Stores the user in MongoDB using Mongoose.
- Returns a JWT token + user info (excluding sensitive data).

---

## 📥 Request Body

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### 🔐 Required Fields

| Field                | Type     | Required | Rules / Description                                 |
|---------------------|----------|----------|-----------------------------------------------------|
| `fullName.firstName`| String   | ✅ Yes   | Minimum 3 characters                                |
| `fullName.lastName` | String   | ❌ No    | Optional; if provided, must be at least 3 characters|
| `email`             | String   | ✅ Yes   | Must be a valid email and unique in the database    |
| `password`          | String   | ✅ Yes   | Minimum 6 characters                                |

---

## ✅ Success Response

**Status Code:** `201 Created`

**Response Example:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64fbe4aa0f4a8a36c8947f00",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null // for tracking purpose
  }
}
```

---

## ❌ Error Responses

### 📭 400 Bad Request

If validation fails or required fields are missing.

**Example:**

```json
{
  "errors": [
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## ⚙️ Behind the Scenes (How it works)

- **Validation** is handled in `user.routes.js` using `express-validator`.
- **Password Hashing** is done via `bcrypt` before saving.
- **User Model** is defined in `user.model.js` with custom validation rules.
- **Token Generation** is done via a `generateAuthToken()` method on the user model using `jsonwebtoken`.
- **User Creation** logic lives in `user.service.js`.

---

## 🔐 JWT Token

The JWT token contains the user’s ID and is signed using your `JWT_SECRET`. It's returned as a string and should be stored by the client for authenticated requests.

---

## 🧪 Example Curl Request

```bash
curl -X POST http://localhost:3000/users/register   -H "Content-Type: application/json"   -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

---

## 🔓 Auth Required?

Nope. This is a public endpoint. No token needed to register.

---

## ⚠️ Important Notes

- Emails must be unique, or MongoDB will throw a duplicate key error.
- Passwords are stored hashed and never exposed in the response.
- If `lastName` is not provided, it's saved as `undefined` (which is fine).
- The token should be used in the `Authorization` header for future requests like:
  
  ```http
  Authorization: Bearer <token>
  ```

---

## 📂 Related Files

- `user.routes.js` – defines the POST `/register` route.
- `user.controller.js` – handles the incoming request and returns response.
- `user.model.js` – defines the schema and validation logic.
- `user.service.js` – handles business logic for registering users.

---
