Apna POS - Modern Point of Sale System

A comprehensive Point of Sale (POS) system designed for retail chains, supermarkets, and shopping malls. Built with modern web technologies for optimal performance and user experience.

Core Features
Multi-Role Authentication - Admin, Store Manager, Branch Manager, Cashier
Real-time POS Terminal - Product catalog, cart management, payment processing
Inventory Management - Stock tracking, low alerts, multi-store sync
Sales Analytics - Real-time insights, performance metrics, reporting
Customer Management - Customer profiles, purchase history, loyalty programs
Employee Management - Role-based access, time tracking, commission management

Payment Processing
Multiple payment methods (Card, Cash, Digital Wallets)
Secure transaction processing
Receipt generation and email
Refund and return management
Split payments and tips

Business Intelligence
Sales trend analysis
Product performance tracking
Customer behavior insights
Inventory optimization
Financial reporting

User Experience
Responsive design for all devices
Dark/Light theme support
Intuitive navigation
Real-time updates
Offline capability

Tech Stack

Frontend
React 19 - Modern hooks and concurrent features
Vite - Lightning-fast build tool
Redux Toolkit - State management
TailwindCSS - Utility-first styling
React Router v6 - Client-side routing
Lucide React - Beautiful icons
Shadcn/ui - Modern component library

Backend Integration
RESTful APIs - Standardized endpoints
JWT Authentication - Secure token-based auth
Axios - HTTP client with interceptors
Mock Services - Production demo fallbacks

Installation

Prerequisites
Node.js 18+ 
npm or yarn
Git

Setup
Clone the repository
git clone https://github.com/saurav-sirsat/Apna_book_pos.git
cd Apna_book_pos

Install dependencies
npm install

Start development server
npm run dev

Build for production
npm run build

Preview production build
npm run preview

Configuration

Environment Variables
Create a .env file in the root directory:

API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_AUTH_BASE_URL=http://localhost:8080/auth

Environment
VITE_NODE_ENV=development

Production Setup
Production API
VITE_API_BASE_URL=https://api.apnapos.com/api
VITE_AUTH_BASE_URL=https://api.apnapos.com/auth

Environment
VITE_NODE_ENV=production

Project Structure

src/
components/           # Reusable UI components
  ui/             # Shadcn/ui components
pages/              # Page components by role
  common/          # Landing, auth, shared pages
  cashier/         # Cashier-specific pages
  store/           # Store admin pages
  Branch Manager/   # Branch manager pages
  SuperAdmin/      # Super admin pages
routes/             # Route definitions by role
Redux Toolkit/       # Redux state management
  features/       # Feature-based slices
utils/              # Utility functions
hooks/              # Custom React hooks
context/            # React contexts
assets/             # Static assets

User Roles and Access

Store Admin
Dashboard: /store - Store overview and metrics
Products: /store/products - Product catalog management
Categories: /store/categories - Category organization
Employees: /store/employees - Staff management
Branches: /store/branches - Multi-store management
Reports: /store/reports - Business analytics
Settings: /store/settings - Store configuration

Cashier
POS Terminal: /cashier - Main checkout interface
Orders: /cashier/orders - Order history
Returns: /cashier/returns - Return processing
Customers: /cashier/customers - Customer lookup
Shift Summary: /cashier/shift-summary - Daily reports

Branch Manager
Dashboard: /branch - Branch overview
Inventory: /branch/inventory - Stock management
Orders: /branch/orders - Order management
Employees: /branch/employees - Staff scheduling
Reports: /branch/reports - Branch analytics

Super Admin
Dashboard: /super-admin - System overview
Stores: /super-admin/stores - All store management
Subscriptions: /super-admin/subscriptions - Plan management
Settings: /super-admin/settings - System configuration

Authentication

Login Flow
User enters credentials
System validates with backend
JWT token stored securely
User profile loaded into Redux
Redirected to role-based dashboard

Role-Based Access
Automatic route protection based on user role
Secure API communication with JWT
Session management and timeout
Logout and token cleanup

Responsive Design

Desktop (1024px+)
Full dashboard functionality
Multi-window support
Advanced reporting features
Comprehensive navigation

Tablet (768px-1024px)
Optimized dashboard layouts
Touch-friendly interfaces
Simplified navigation
Core functionality preserved

Mobile (<768px)
Streamlined POS interface
Swipe gestures support
Essential features only
Performance optimized

Theming

Light Theme (Default)
Clean, modern interface
High contrast for readability
Professional appearance
Optimized for daylight use

Dark Theme
Reduced eye strain
Enhanced focus
Modern aesthetic
Optimized for low-light environments

Deployment

Vercel (Recommended)
Install Vercel CLI
npm i -g vercel

Deploy to production
npm run build
vercel --prod

Environment variables in Vercel dashboard

Docker
Build Docker image
docker build -t apna-pos .

Run container
docker run -p 3000:3000 apna-pos

Static Hosting
Build static files
npm run build

Deploy dist/ folder to any static host

Testing

Unit Tests
Run component tests
npm run test

Test coverage
npm run test:coverage

E2E Tests
Run end-to-end tests
npm run test:e2e

Linting
Code quality checks
npm run lint

Fix linting issues
npm run lint:fix

Performance

Core Web Vitals
Lighthouse Score: 90+
First Contentful Paint: <2.5s
Largest Contentful Paint: <4s
Cumulative Layout Shift: <0.1

Optimization Techniques
Code splitting and lazy loading
Image optimization and WebP format
Service worker for offline support
Bundle size optimization
CDN integration for assets

Development

Available Scripts
dev: Start development server
build: Build for production
preview: Preview production build
test: Run unit tests
lint: Code quality checks
type-check: TypeScript validation

Component Development
Use Shadcn/ui components as base
Follow React 19 best practices
Implement proper TypeScript types
Add comprehensive error boundaries

State Management
Redux Toolkit for global state
Local state for component-specific data
Optimistic updates for better UX
Proper error handling and loading states

Contributing

1. Fork the repository
2. Create feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open Pull Request

Code Standards
Follow ESLint configuration
Write meaningful commit messages
Add tests for new features
Update documentation

License

This project is licensed under the MIT License - see the LICENSE file for details.

Support

Documentation
User Guide - ./docs/user-guide.md
API Documentation - ./docs/api.md
Deployment Guide - ./docs/deployment.md

Issues
Bug Reports - https://github.com/saurav-sirsat/Apna_book_pos/issues
Feature Requests - https://github.com/saurav-sirsat/Apna_book_pos/issues
Discussions - https://github.com/saurav-sirsat/Apna_book_pos/discussions

Roadmap

Version 2.0
Mobile app (React Native)
Advanced analytics dashboard
Multi-language support
Advanced inventory features
API rate limiting and caching

Version 1.5
Offline mode improvements
Enhanced reporting
Integration marketplace
Advanced user permissions

Built with love for modern retail businesses

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and typescript-eslint in your project.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
