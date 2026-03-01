

### Test Results

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"fullName":"Test User","email":"test@example.com","password":"test123","phone":"1234567890","role":"ROLE_CUSTOMER"}' \
http://localhost/auth/signup

# Response: User created successfully with JWT token
```

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"test123"}' \
http://localhost/auth/login

# Response: User logged in successfully with JWT token
```

```bash
curl -H "Authorization: Bearer <JWT_TOKEN>" \
http://localhost/api/

# Response: Successfully accesses protected endpoints
```

## Authentication Flow

### 1. **Signup Process**
- **Endpoint**: `POST /auth/signup`
- **Required Fields**: `fullName`, `email`, `password`, `phone`, `role`
- **Response**: JWT token + user data

### 2. **Login Process**
- **Endpoint**: `POST /auth/login`
- **Required Fields**: `email`, `password`
- **Response**: JWT token + user data

### 3. **Protected Access**
- **Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Protected Endpoints**: All `/api/*` except `/api/health` and `/api/auth/*`

## Available User Roles

```java
public enum UserRole {
    ROLE_ADMIN,
    ROLE_STORE_ADMIN, 
    ROLE_STORE_MANAGER,
    ROLE_BRANCH_MANAGER,
    ROLE_BRANCH_ADMIN,
    ROLE_BRANCH_CASHIER,
    ROLE_CUSTOMER
}
```

## Frontend Integration

### Environment Configuration
- `VITE_API_BASE_URL=/api` (for API endpoints)
- Auth endpoints: `/auth/signup`, `/auth/login`

### Nginx Proxy Configuration
- `/api/*` → `pos-backend:5000/api/*`
- `/auth/*` → `pos-backend:5000/auth/*`

## Security Configuration

### Public Endpoints
- `/` - Home endpoint
- `/api/health` - Health check
- `/api/auth/*` - Authentication endpoints
- `/api/public/*` - Public API endpoints

### Protected Endpoints
- All `/api/*` require JWT authentication
- `/api/super-admin/*` require ADMIN role

## JWT Configuration

### Token Details
- **Algorithm**: HS256
- **Expiration**: 24 hours
- **Secret**: Configured in application
- **Header**: `Authorization: Bearer <token>`

### Token Payload
```json
{
  "email": "user@example.com",
  "authorities": "ROLE_CUSTOMER",
  "iat": 173903725,
  "exp": 173990125
}
```

## Test Users Created

1. **test@example.com** - ROLE_CUSTOMER
2. **test2@example.com** - ROLE_CUSTOMER

Both users can login with password: `test123`

## Frontend Usage

The frontend can now:

## Status: 🎉 FULLY FUNCTIONAL

The authentication system is completely working and ready for frontend integration!
