# React + Vite + Spring Boot Connection Guide

## ✅ Fixed Issues

### 1. **Missing Dependencies**
- ✅ Added `react-router-dom` for routing
- ✅ Already had `axios` for HTTP requests

### 2. **API Configuration**
- ✅ Created `.env.development` with `VITE_API_BASE_URL=http://localhost:8080/api`
- ✅ Created `.env.production` for production environment
- ✅ Updated `vite.config.js` with proxy configuration for development

### 3. **API Service**
- ✅ `axiosConfig.js` - Configured axios instance with base URL from environment variables
- ✅ `userService.js` - Complete CRUD operations for users
- ✅ `productService.js` - Complete CRUD operations for products (fixed)

### 4. **Components**
- ✅ Created `Components/UserList.jsx` - Displays and manages users
- ✅ Created `Components/Home.jsx` - Home page component
- ✅ Fixed case sensitivity in import paths (UserList vs UserList)

## 🚀 Setup Instructions

### Prerequisites
Make sure your Spring Boot backend is running on `http://localhost:8080`

### Step 1: Start the React Development Server
```bash
cd client
npm run dev
```

The app will run on `http://localhost:5173` by default.

### Step 2: Verify Backend Connection

#### For Development (with Vite Proxy):
- All API calls to `/api/*` will be proxied to `http://localhost:8080/api/*`
- Ensure your Spring Boot has CORS enabled (if calling from different port)

#### Spring Boot CORS Configuration (Example):
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
            }
        };
    }
}
```

## 📝 API Service Usage Examples

### Fetching Users
```javascript
import { userService } from './api/userService';

const users = await userService.getAllUsers();
```

### Creating a User
```javascript
const newUser = {
  name: 'John Doe',
  email: 'john@example.com'
};
const createdUser = await userService.createUser(newUser);
```

### Updating a User
```javascript
const updatedUser = await userService.updateUser(userId, {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

### Deleting a User
```javascript
await userService.deleteUser(userId);
```

## 🔧 Environment Variables

### Development (.env.development)
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production (.env.production)
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## 🐛 Troubleshooting

### 1. **CORS Error**
**Problem:** `Access to XMLHttpRequest blocked by CORS policy`
**Solution:** 
- Enable CORS on your Spring Boot backend
- Check that the base URL matches the backend server

### 2. **API calls return 404**
**Problem:** `Cannot GET /api/users`
**Solution:**
- Verify your Spring Boot endpoints match the service calls
- Check that your backend is running on port 8080

### 3. **Network Error**
**Problem:** `Network error: Error request`
**Solution:**
- Ensure Spring Boot is running
- Check the port number (should be 8080)
- Verify firewall settings

## 📁 Project Structure
```
client/
├── src/
│   ├── api/
│   │   ├── axiosConfig.js      (Axios configuration)
│   │   ├── userService.js      (User API calls)
│   │   └── productService.js   (Product API calls)
│   ├── Components/
│   │   ├── UserList.jsx        (User management component)
│   │   └── Home.jsx            (Home page)
│   ├── Pages/
│   │   └── Dashboard.jsx       (Dashboard page)
│   ├── App.jsx                 (Main app component with routing)
│   └── main.jsx                (Entry point)
├── .env.development            (Dev environment variables)
├── .env.production             (Prod environment variables)
├── vite.config.js              (Vite configuration with proxy)
└── package.json                (Dependencies)
```

## ✅ Connection Verification

To verify your connection is working:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Fetch from Backend" or navigate to `/users`
4. Check if the request shows as successful (200 status)
5. Inspect the response to see your data

## 📦 Installed Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `vite` - Build tool

---
**Your React + Spring Boot project is now properly connected! 🎉**
