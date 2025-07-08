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
    "socketId": null
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

# 🔑 User Login Endpoint Documentation

## 📌 POST /users/login

This endpoint allows a registered user to log in. If the credentials are valid, it returns a **JWT token** and the user details (no password leaks, pinky promise 🤞).

---

## 📝 Description

The `/users/login` endpoint handles authentication for users. It:

- Validates email and password via `express-validator`.
- Checks if the user exists and if the password matches.
- Returns a JWT token and user info (excluding sensitive data).

---

## 📥 Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### 🔐 Required Fields

| Field     | Type   | Required | Rules / Description                      |
|-----------|--------|----------|------------------------------------------|
| `email`   | String | ✅ Yes   | Must be a valid email                    |
| `password`| String | ✅ Yes   | Minimum 6 characters                     |

---

## ✅ Success Response

**Status Code:** `200 OK`

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
    "socketId": null
  }
}
```

---

## ❌ Error Responses

### 🚫 400 Bad Request

If validation fails (like invalid email format or short password).

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

### 🚫 401 Unauthorized

If the email doesn't exist or the password doesn't match.

```json
{
  "message": "Invalid email or password"
}
```

---

## ⚙️ Behind the Scenes

- **Validation** is handled in `user.routes.js` using `express-validator`.
- **Password Comparison** uses bcrypt’s `.compare()` method.
- **JWT Token** is created via `generateAuthToken()` on the user model.
- **Auth Logic** lives in `user.controller.js`.

---

## 🧪 Example Curl Request

```bash
curl -X POST http://localhost:3000/users/login   -H "Content-Type: application/json"   -d '{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}'
```

---

## 🔓 Auth Required?

Nope. This one’s public too — credentials are your ticket in.

---

## ⚠️ Important Notes

- Both `email` and `password` must be valid or you'll get rejected real quick.
- Don’t forget to save the token client-side — you’ll need it for accessing protected routes later.
- Token format in headers should be:

  ```http
  Authorization: Bearer <token>
  ```

---

## 📂 Related Files

- `user.routes.js` – defines the POST `/login` route.
- `user.controller.js` – handles authentication logic.
- `user.model.js` – defines password comparison + token generation.
- `user.service.js` – not used here directly, but involved elsewhere in user logic.

---

---

# 👤 User Profile Endpoint Documentation

### 📌 GET /users/profile

This endpoint retrieves the profile information of the currently authenticated user.

---

### 📝 Description

The `/users/profile` endpoint:

- Requires a valid **JWT token** via the `Authorization` header.
- Returns the authenticated user’s information.
- Does **not** expose sensitive data like the password.

---

### 📥 Request Headers

| Header          | Value                | Required | Description                                    |
|-----------------|----------------------|----------|------------------------------------------------|
| Authorization   | `Bearer <JWT_token>` | ✅ Yes   | Must be a valid token from login or register   |

---

### ✅ Success Response

**Status Code:** `200 OK`

**Response Example:**

```json
{
  "user": {
    "_id": "64fbe4aa0f4a8a36c8947f00",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

### ❌ Error Response

#### 🚫 401 Unauthorized

If the JWT token is missing or invalid.

```json
{
  "message": "Unauthorized"
}
```

---

### 🔓 Auth Required?

✅ Yes — must include valid token in the `Authorization` header.

---

### 📂 Related Files

- `user.routes.js` – defines the `GET /profile` route.
- `user.controller.js` – contains the logic to return `req.user`.
- `auth.middleware.js` – verifies and injects user from JWT.

---

# 🚪 User Logout Endpoint Documentation

### 📌 GET /users/logout

This endpoint logs the user out by clearing the JWT cookie and blacklisting the token.

---

### 📝 Description

The `/users/logout` endpoint:

- Requires a valid **JWT token**.
- Clears the authentication cookie (`token`).
- Stores the token in a **blacklist** so it can’t be reused.

---

### 📥 Request Headers

| Header          | Value                | Required | Description                                     |
|-----------------|----------------------|----------|-------------------------------------------------|
| Authorization   | `Bearer <JWT_token>` | ✅ Yes   | Token will be invalidated after logout          |

---

### ✅ Success Response

**Status Code:** `200 OK`

**Response Example:**

```json
{
  "message": "Logged out successfully"
}
```

---

### ❌ Error Response

#### 🚫 401 Unauthorized

If the user is not authenticated or token is missing.

```json
{
  "message": "Unauthorized"
}
```

---

### 🔓 Auth Required?

✅ Yes — must be authenticated.

---

### ⚠️ Important Notes

- Token is stored in a **blacklist**, so future requests using it will fail.
- Token is extracted from `Authorization` header or cookie.

---

### 📂 Related Files

- `user.routes.js` – defines the `GET /logout` route.
- `user.controller.js` – handles the logout logic.
- `blacklistToken.model.js` – stores blacklisted tokens.
- `auth.middleware.js` – ensures only authenticated users can access.

---

# 🧭 Captain Registration Endpoint Documentation

## 📌 POST /captains/register

This endpoint allows a new **Captain** to register on the platform. On successful registration, a **JWT token** is returned along with the captain’s details.

---

## 📝 Description

The `/captains/register` endpoint:

* Validates the request using `express-validator`.
* Hashes the password using bcrypt.
* Stores captain and vehicle info in MongoDB.
* Returns a JWT token + captain info (excluding sensitive data).

---

## 📥 Request Body

```json
{
  "fullName": {
    "firstName": "Rick",
    "lastName": "Grimes"
  },
  "email": "rick.grimes@example.com",
  "password": "drivingSafe123",
  "vehicle": {
    "color": "Black",
    "plate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### 🔐 Required Fields

| Field                 | Type   | Required | Rules / Description                  |
| --------------------- | ------ | -------- | ------------------------------------ |
| `fullName.firstName`  | String | ✅ Yes    | Minimum 3 characters                 |
| `fullName.lastName`   | String | ✅ Yes    | Minimum 3 characters                 |
| `email`               | String | ✅ Yes    | Must be a valid and unique email     |
| `password`            | String | ✅ Yes    | Minimum 6 characters                 |
| `vehicle.color`       | String | ✅ Yes    | Minimum 3 characters                 |
| `vehicle.plate`       | String | ✅ Yes    | Minimum 3 characters, must be unique |
| `vehicle.capacity`    | Number | ✅ Yes    | Minimum value of 1                   |
| `vehicle.vehicleType` | String | ✅ Yes    | One of: `'car'`, `'bike'`, `'auto'`  |

---

## ✅ Success Response

**Status Code:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64fbe4aa0f4a8a36c8947abc",
    "fullName": {
      "firstName": "Rick",
      "lastName": "Grimes"
    },
    "email": "rick.grimes@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

---

## ❌ Error Responses

### 🚫 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Password must be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## 🔓 Auth Required?

❌ No — this is a public endpoint.

---

## 📂 Related Files

* `captain.routes.js` – defines the POST `/register` route.
* `captain.controller.js` – handles registration logic.
* `captain.model.js` – defines the schema and validation.
* `captain.service.js` – handles business logic for creating captains.

---

# 🔐 Captain Login Endpoint Documentation

## 📌 POST /captains/login

Allows a registered captain to log in and receive a **JWT token** for authentication.

---

## 📝 Description

The `/captains/login` endpoint:

* Validates the email and password.
* Verifies credentials against stored data.
* Returns a JWT token + captain info (password excluded).

---

## 📥 Request Body

```json
{
  "email": "rick.grimes@example.com",
  "password": "drivingSafe123"
}
```

### 🔐 Required Fields

| Field      | Type   | Required | Rules / Description   |
| ---------- | ------ | -------- | --------------------- |
| `email`    | String | ✅ Yes    | Must be a valid email |
| `password` | String | ✅ Yes    | Minimum 6 characters  |

---

## ✅ Success Response

**Status Code:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64fbe4aa0f4a8a36c8947abc",
    "fullName": {
      "firstName": "Rick",
      "lastName": "Grimes"
    },
    "email": "rick.grimes@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

---

## ❌ Error Responses

### 🚫 400 Bad Request

```json
{
  "error": [
    {
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### 🚫 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

---

## 🔓 Auth Required?

❌ No — login is open.

---

## 📂 Related Files

* `captain.routes.js` – defines the POST `/login` route.
* `captain.controller.js` – handles authentication.
* `captain.model.js` – manages password comparison & JWT generation.

---

# 👤 Captain Profile Endpoint Documentation

## 📌 GET /captains/profile

Returns the currently authenticated captain’s profile details.

---

## 📝 Description

The `/captains/profile` endpoint:

* Requires a valid JWT token in the request header.
* Returns the captain info if authenticated.

---

## 📥 Request Headers

| Header        | Value                | Required | Description                   |
| ------------- | -------------------- | -------- | ----------------------------- |
| Authorization | Bearer `<JWT_token>` | ✅ Yes    | JWT token from login/register |

---

## ✅ Success Response

**Status Code:** `200 OK`

```json
{
  "captain": {
    "_id": "64fbe4aa0f4a8a36c8947abc",
    "fullName": {
      "firstName": "Rick",
      "lastName": "Grimes"
    },
    "email": "rick.grimes@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

---

## ❌ Error Response

### 🚫 404 Not Found

```json
{
  "message": "Captain not found"
}
```

---

## 🔓 Auth Required?

✅ Yes

---

## 📂 Related Files

* `captain.routes.js` – defines GET `/profile`
* `captain.controller.js` – contains logic
* `auth.middleware.js` – verifies JWT and injects `req.captain`

---

# 🚪 Captain Logout Endpoint Documentation

## 📌 GET /captains/logout

Logs out the currently authenticated captain.

---

## 📝 Description

The `/captains/logout` endpoint:

* Requires a valid JWT token.
* Blacklists the token to prevent reuse.
* Clears the authentication cookie.

---

## 📥 Request Headers

| Header        | Value                | Required | Description                 |
| ------------- | -------------------- | -------- | --------------------------- |
| Authorization | Bearer `<JWT_token>` | ✅ Yes    | JWT token to be invalidated |

---

## ✅ Success Response

**Status Code:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

---

## ❌ Error Response

### 🚫 401 Unauthorized

```json
{
  "message": "Unauthorized access"
}
```

---

## 🔓 Auth Required?

✅ Yes

---

## 📂 Related Files

* `captain.routes.js` – defines GET `/logout`
* `captain.controller.js` – performs token blacklist + cookie clear
* `blacklistToken.model.js` – stores revoked tokens
* `auth.middleware.js` – ensures JWT is valid

---
