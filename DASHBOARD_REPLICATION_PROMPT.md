# POS Dashboard Replication Prompt

Create a comprehensive Point of Sale (POS) system dashboard identical to the one at http://127.0.0.1:42035/ with the following specifications:

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend**: React 19.1.0 + Vite 7.0.0
- **UI Framework**: TailwindCSS 4.1.11 + Radix UI components
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Backend Integration**: Axios for API calls

### Backend API Integration
- **Base URL**: http://localhost:5000
- **Authentication**: JWT Bearer tokens
- **API Endpoints**: RESTful architecture

## 🎨 Design System

### Color Palette
```css
--primary: #3b82f6 (blue-500)
--primary/5: rgba(59, 130, 246, 0.05)
--primary/10: rgba(59, 130, 246, 0.1)
--background: #ffffff
--foreground: #0f172a
--muted: #f1f5f9
--border: #e2e8f0
--accent: #f8fafc
```

### Typography
- **Font Family**: Winky Rough (display) + Bitcount Grid Double (mono)
- **Headings**: Bold, large sizes with proper hierarchy
- **Body**: Clean, readable sans-serif

### Component Library (Radix UI)
- Accordion, Alert Dialog, Avatar, Checkbox
- Dialog, Dropdown Menu, Label, Popover
- Progress, Radio Group, Scroll Area, Select
- Separator, Slider, Switch, Tabs, Toast
- Tooltip, Toggle, Toggle Group

## 📱 Multi-Role Dashboard Structure

### 1. Landing Page (Public)
```jsx
// Components Required:
- Header (with navigation, login/signup buttons)
- HeroSection (value proposition, CTA buttons)
- TrustedLogos (client testimonials)
- KeyFeaturesSection (feature highlights)
- WhyChooseUsSection (benefits)
- LiveDemoSection (demo preview)
- TestimonialCarousel (customer reviews)
- PricingSection (pricing plans)
- PricingCalculator (cost calculator)
- FAQSection (frequently asked questions)
- ContactSection (contact form)
- Footer (links, social media)
```

### 2. Authentication Pages
```jsx
// Login Page Features:
- Email/Password form
- Forgot password link
- Remember me checkbox
- Social login options
- Sign up link

// Signup Page Features:
- Full name, email, phone, password
- Role selection (Customer, Store Admin, etc.)
- Terms and conditions
- Already have account link
```

### 3. Super Admin Dashboard
```jsx
// Layout Structure:
<SuperAdminSidebar />
<div className="flex-1 flex flex-col">
  <SuperAdminTopbar />
  <main className="flex-1 overflow-y-auto p-8 md:p-10 lg:p-12 bg-background/80 rounded-tl-3xl shadow-xl m-4">
    {children}
  </main>
</div>

// Sidebar Navigation Items:
- Dashboard Overview
- Store Management
- User Management
- Analytics & Reports
- Subscription Plans
- System Settings
- Audit Logs
- Support Tickets

// Key Features:
- Store approval workflow
- User role management
- System-wide analytics
- Revenue tracking
- Subscription management
```

### 4. Store Admin Dashboard
```jsx
// Layout Structure:
<StoreSidebar />
<div className="flex-1 flex flex-col">
  <StoreTopbar />
  <main className="flex-1 overflow-y-auto p-8 md:p-10 lg:p-12 bg-background/80 rounded-tl-3xl shadow-xl m-4">
    {children}
  </main>
</div>

// Sidebar Navigation Items:
- Dashboard Overview
- Product Management
- Inventory
- Orders & Sales
- Customer Management
- Employee Management
- Branch Management
- Analytics
- Settings

// Key Features:
- Store setup wizard (onboarding)
- Product catalog management
- Inventory tracking
- Sales analytics
- Employee scheduling
- Customer data management
```

### 5. Branch Manager Dashboard
```jsx
// Similar layout to Store Admin
// Focus on branch-specific operations:
- Branch inventory
- Local staff management
- Branch performance metrics
- Regional reporting
```

### 6. Cashier Dashboard (POS Terminal)
```jsx
// Layout Structure:
<CashierSideBar />
<main className="flex-1 overflow-y-auto">
  {children}
</main>

// Navigation Items:
- POS Terminal (main checkout)
- Order History
- Returns/Refunds
- Shift Reports
- Customer Lookup

// POS Terminal Features:
- Product search and scan
- Shopping cart management
- Payment processing (cash, card, digital)
- Receipt printing
- Customer identification
- Discount application
```

## 🔐 Authentication & Authorization

### User Roles & Permissions
```javascript
const USER_ROLES = {
  ROLE_ADMIN: 'System administration',
  ROLE_STORE_ADMIN: 'Store management',
  ROLE_STORE_MANAGER: 'Store operations',
  ROLE_BRANCH_MANAGER: 'Branch management',
  ROLE_BRANCH_ADMIN: 'Branch administration',
  ROLE_BRANCH_CASHIER: 'POS operations',
  ROLE_CUSTOMER: 'Shopping experience'
}
```

### JWT Token Management
- Token storage in localStorage
- Automatic token refresh
- Protected route guards
- Role-based access control


### Analytics Cards
```jsx
// Key Metrics Cards:
- Total Revenue
- Total Orders
- Active Customers
- Inventory Status
- Staff Performance
- Store Performance

// Features:
- Real-time updates
- Trend indicators (up/down arrows)
- Percentage changes
- Time period filters
- Export options
```

### Data Tables
```jsx
// Common Table Features:
- Sorting and filtering
- Pagination
- Search functionality
- Bulk actions
- Row selection
- Export to CSV/PDF
- Responsive design
```

### Charts & Graphs
```jsx
// Chart Types:
- Line charts (revenue trends)
- Bar charts (sales comparison)
- Pie charts (category breakdown)
- Area charts (growth metrics)
- Heat maps (performance)

// Using Recharts library
- Interactive tooltips
- Legend controls
- Time range selectors
- Export functionality
```

## 🛠️ Technical Implementation

### Project Structure
```
src/
├── components/
│   ├── ui/ (Radix UI components)
│   ├── common/ (shared components)
│   └── charts/ (data visualization)
├── pages/
│   ├── common/
│   │   ├── Landing/
│   │   └── Auth/
│   ├── SuperAdminDashboard/
│   ├── store/
│   ├── Branch Manager/
│   └── cashier/
├── Redux Toolkit/
│   ├── features/
│   └── slices/
├── context/
├── hooks/
├── utils/
└── styles/
```

### State Management (Redux Toolkit)
```javascript
// Store Slices:
- authSlice (user authentication)
- storeSlice (store data)
- productSlice (product catalog)
- orderSlice (order management)
- userSlice (user management)
- analyticsSlice (dashboard metrics)
```

### API Integration
```javascript
// Service Layer:
- authService.js (auth endpoints)
- storeService.js (store operations)
- productService.js (product management)
- orderService.js (order processing)
- analyticsService.js (data fetching)
```

## 🎯 Key Features to Implement

### 1. Responsive Design
- Mobile-first approach
- Tablet and desktop layouts
- Touch-friendly interfaces
- Adaptive navigation

### 2. Real-time Updates
- WebSocket integration for live data
- Auto-refreshing dashboard metrics
- Real-time order status
- Live inventory updates

### 3. Search & Filtering
- Global search functionality
- Advanced filtering options
- Auto-complete suggestions
- Saved search preferences

### 4. Data Export
- CSV export for tables
- PDF report generation
- Excel compatibility
- Scheduled reports

### 5. User Preferences
- Theme switching (light/dark)
- Language selection
- Dashboard customization
- Notification preferences

## 🚀 Performance Optimizations

### Code Splitting
- Route-based lazy loading
- Component-level splitting
- Dynamic imports
- Bundle optimization

### Caching Strategy
- API response caching
- Component memoization
- Image optimization
- Service worker implementation

### SEO & Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader support

## 📱 Mobile Considerations

### Mobile POS Features
- Touch-optimized interface
- Swipe gestures
- Camera integration (barcode scanning)
- Mobile payment support
- Offline mode capability

### Responsive Breakpoints
```css
/* Mobile: 320px - 768px */
/* Tablet: 768px - 1024px */
/* Desktop: 1024px - 1440px */
/* Large Desktop: 1440px+ */
```

## 🔧 Development Setup

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_AUTH_BASE_URL=http://localhost:5000/auth
VITE_RAZORPAY_KEY=your_razorpay_key
VITE_STRIPE_KEY=your_stripe_key
```

### Required Dependencies
```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-rou0ter": "^7.6.3",
    "@reduxjs/toolkit": "^2.8.2",
    "react-redux": "^9.2.0",
    "axios": "^1.10.0",
    "tailwindcss": "^4.1.11",
    "@radix-ui/*": "latest versions",
    "lucide-react": "^0.525.0",
    "recharts": "^3.1.0",
    "react-hook-form": "^7.60.0",
    "zod": "^3.25.75"
  }
}
```

## 🎨 UI/UX Guidelines

### Design Principles
- Clean, modern interface
- Consistent spacing and typography
- Intuitive navigation
- Clear visual hierarchy
- Accessible color contrasts
- Smooth animations and transitions

### Component Standards
- Reusable component library
- Consistent prop interfaces
- Storybook documentation
- Unit test coverage
- TypeScript support


### POS Operations
- Product catalog with categories
- Barcode scanning integration
- Discount and coupon management
- Tax calculation
- Multiple payment methods
- Receipt generation
- Order history tracking

### Inventory Management
- Stock level monitoring
- Automatic reorder alerts
- Supplier management
- Purchase order creation
- Stock movement tracking
- Loss prevention

### Reporting & Analytics
- Sales reports (daily, weekly, monthly)
- Product performance analysis
- Customer purchase history
- Staff productivity metrics
- Profit and loss statements
- Custom report builder

This comprehensive prompt provides all the necessary details to recreate the exact same POS dashboard with full functionality, modern UI/UX, and production-ready features.
