# Apna POS

### Modern Open Source Point of Sale System

**Introduction · Features · Demo · Installation · Configuration · Development · Contributing · License · Credits**

---

## 👋 Introduction

**Apna POS** is a comprehensive, enterprise-grade Point of Sale (POS) system designed for modern retail businesses, supermarkets, and multi-chain stores. Built with cutting-edge technology stack, it provides seamless billing, intelligent inventory management, advanced analytics, and role-based operational control through an intuitive, responsive interface.

This full-stack application demonstrates production-ready architecture with Spring Boot backend and React frontend, implementing real-world business workflows and security best practices.

---

## 🚀 Core Features

### Point of Sale Operations

* Real-time checkout terminal with barcode scanning support
* Dynamic cart management with tax calculations
* Order history and tracking system
* Digital receipt generation with PDF export
* Refund and return processing with approval workflows
* Split payment handling and cash management

### Inventory Management

* Multi-category product catalog management
* Real-time stock monitoring and alerts
* Low inventory notifications and reorder points
* Multi-branch inventory synchronization
* Supplier and purchase order tracking
* Batch and expiry date management

### Multi-User Role System

* **Super Admin**: System-wide oversight and configuration
* **Store Admin**: Store-level management and reporting
* **Branch Manager**: Branch operations and staff management
* **Cashier**: Point-of-sale operations and customer service
* Granular permission-based access control

### Customer Relationship Management

* Customer profile management with purchase history
* Loyalty program integration framework
* Customer analytics and spending patterns
* Contact management and communication tools

### Advanced Analytics & Reporting

* Real-time sales performance dashboards
* Revenue and profit analytics with visualizations
* Product performance metrics and trend analysis
* Employee productivity tracking
* Custom report generation with data export

---

## 💳 Payment Processing

* **Multiple Payment Methods**: Cash, Card, Digital Wallets
* **Payment Gateway Integration**: Razorpay & Stripe support
* **Split Payments**: Multiple payment method combinations
* **Transaction Security**: Encrypted payment processing
* **Invoice Management**: Automated invoice generation
* **Receipt Options**: Digital and printed receipts

---

## 🎨 User Experience Design

* **Responsive Interface**: Optimized for desktop, tablet, and mobile
* **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
* **Dark/Light Themes**: User preference support
* **Real-time Updates**: Live data synchronization
* **Offline Capability**: Core POS functionality available offline
* **Accessibility**: WCAG compliant design patterns

---

## 🧪 Live Demo

Demo environment available at: [Coming Soon]

**Test Credentials:**
```
Super Admin:
Username: admin@apnapos.com
Password: admin123

Store Manager:
Username: manager@apnapos.com
Password: manager123

Cashier:
Username: cashier@apnapos.com
Password: cashier123
```

---

## 🛠 Technology Stack

### Frontend Architecture

* **React 19**: Modern component-based UI framework
* **Vite 7**: Lightning-fast build tool and dev server
* **Redux Toolkit**: State management with RTK Query
* **Tailwind CSS 4**: Utility-first CSS framework
* **React Router v7**: Client-side routing
* **Radix UI**: Accessible component library
* **Recharts**: Data visualization and analytics
* **React Hook Form**: Form management with validation
* **Lucide React**: Modern icon system

### Backend Infrastructure

* **Spring Boot 3.5**: Enterprise Java framework
* **Spring Security**: Authentication and authorization
* **Spring Data JPA**: Database abstraction layer
* **MySQL 8**: Relational database management
* **JWT**: Token-based authentication
* **Lombok**: Java code generation
* **Maven**: Dependency management and build tool

### Payment Integration

* **Razorpay**: Indian payment gateway
* **Stripe**: International payment processing
* **Secure API**: PCI DSS compliant payment handling

---

## 💾 Installation & Setup

### Prerequisites

* **Node.js 18+** or higher
* **Java 17** or higher
* **MySQL 8.0** or higher
* **Maven 3.8** or higher
* **Git** for version control

---

### Quick Start

#### 1. Clone Repository

```bash
git clone https://github.com/saurav-sirsat/Apna-Pos.git
cd Apna-Pos
```

#### 2. Backend Setup

```bash
cd pos-backend

# Configure database
cp src/main/resources/application.example.properties src/main/resources/application.properties

# Edit application.properties with your database credentials
# spring.datasource.url=jdbc:mysql://localhost:3306/apna_pos
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

#### 3. Frontend Setup

```bash
cd pos-frontend-vite

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Edit .env with your API endpoints
# VITE_API_BASE_URL=http://localhost:8080/api
# VITE_AUTH_BASE_URL=http://localhost:8080/auth

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

#### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_AUTH_BASE_URL=http://localhost:8080/auth

# Environment
VITE_NODE_ENV=development

# Optional: Payment Gateway Keys
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

#### Backend (application.properties)

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/apna_pos
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=your_jwt_secret_key_here
jwt.expiration=86400000

# Payment Gateway Configuration
razorpay.key.id=your_razorpay_key_id
razorpay.key.secret=your_razorpay_secret
stripe.secret.key=your_stripe_secret_key
```

---

## 📁 Project Architecture

### Frontend Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   └── layout/         # Layout components (header, sidebar, etc.)
├── pages/              # Route-based page components
│   ├── auth/           # Authentication pages
│   ├── cashier/        # POS interface
│   ├── store/          # Store management
│   ├── branch/         # Branch operations
│   └── super-admin/   # System administration
├── Redux Toolkit/       # Redux state management
│   └── features/       # Feature-based slices
├── routes/            # Route definitions
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── context/           # React contexts
└── assets/            # Static assets
```

### Backend Structure

```
src/main/java/com/zosh/
├── controller/         # REST API endpoints
├── service/           # Business logic layer
├── repository/        # Data access layer
├── domain/           # Entity classes
├── payload/          # DTOs and request/response models
├── configrations/    # Security and app configuration
├── exception/        # Custom exception handlers
├── mapper/           # Data mapping utilities
└── util/             # Helper utilities
```

---

## 🔐 Security Features

### Authentication & Authorization

* **JWT-based Authentication**: Secure token-based session management
* **Role-based Access Control**: Granular permissions by user role
* **Password Security**: BCrypt encryption for password storage
* **Session Management**: Automatic token refresh and timeout
* **API Security**: CORS configuration and request validation

### Data Protection

* **Input Validation**: Comprehensive request validation
* **SQL Injection Prevention**: Parameterized queries
* **XSS Protection**: Output encoding and CSP headers
* **Secure Headers**: Security-focused HTTP headers

---

## 📱 Responsive Design

### Multi-Device Support

* **Desktop**: Full-featured dashboard with multi-panel layout
* **Tablet**: Touch-optimized interface with adaptive layouts
* **Mobile**: Streamlined POS interface for handheld devices
* **Progressive Web App**: Offline capabilities and app-like experience

---

## 🚀 Deployment

### Production Deployment

#### Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

#### Backend (Docker)

```bash
# Build Docker image
cd pos-backend
docker build -t apna-pos-backend .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/apna_pos \
  -e SPRING_DATASOURCE_USERNAME=your_username \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  apna-pos-backend
```

#### Database Setup

```sql
-- Create database
CREATE DATABASE apna_pos;

-- Create user (optional)
CREATE USER 'apna_pos_user'@'%' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON apna_pos.* TO 'apna_pos_user'@'%';
FLUSH PRIVILEGES;
```

---

## 🧪 Testing & Quality Assurance

### Frontend Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Linting
npm run lint
npm run lint:fix
```

### Backend Testing

```bash
# Run all tests
mvn test

# Run with coverage
mvn clean test jacoco:report

# Build and test
mvn clean verify
```

---

## ⚡ Performance Optimizations

### Frontend Performance

* **Code Splitting**: Lazy loading of route components
* **Bundle Optimization**: Tree shaking and minification
* **Asset Optimization**: Image compression and CDN support
* **Caching Strategy**: Service worker implementation
* **Lighthouse Score**: 90+ performance rating

### Backend Performance

* **Database Optimization**: Indexed queries and connection pooling
* **Caching Layer**: Redis integration for frequent data
* **API Optimization**: Pagination and response compression
* **Async Processing**: Non-blocking I/O operations

---

## ✨ Contributing Guidelines

We welcome contributions from the community!

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards

* Follow existing code style and conventions
* Write meaningful commit messages
* Add tests for new features
* Update documentation as needed
* Ensure all tests pass before submitting

---

## 🐛 Issue Reporting

### Before Creating Issues

* Search existing issues for duplicates
* Check if the issue is reproducible
* Provide system information and environment details
* Include screenshots, logs, or error messages when possible

### Security Vulnerabilities

For security-related issues, please email: security@apnapos.com

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to:
* ✅ Use the software for commercial purposes
* ✅ Modify and distribute the code
* ✅ Create derivative works
* ✅ Use it in private projects

See the [LICENSE](LICENSE) file for full details.

---

## 🙏 Acknowledgments

Special thanks to:

* **Spring Boot Team** for the excellent framework
* **React Community** for the amazing ecosystem
* **Open Source Contributors** worldwide
* **Tailwind CSS** for the utility-first framework
* **Radix UI** for accessible components

---

## 🗺️ Development Roadmap

### Version 2.0 (Q2 2024)

* 🚀 Mobile POS application (React Native)
* 📊 Advanced analytics engine with AI insights
* 🌍 Multi-language support (i18n)
* ☁️ Cloud synchronization and backup
* 🔌 Plugin marketplace for extensions

### Version 1.5 (Q1 2024)

* 📱 Enhanced mobile experience
* 📈 Advanced reporting with custom dashboards
* 🔐 Two-factor authentication
* 📧 Email and SMS notifications
* 🔄 Real-time inventory synchronization

### Version 1.2 (Current)

* ✅ Core POS functionality
* ✅ Multi-user role system
* ✅ Payment gateway integration
* ✅ Basic analytics and reporting
* ✅ Responsive design

---

## 📞 Support & Community

* **Documentation**: [docs.apnapos.com](https://docs.apnapos.com)
* **Community Forum**: [community.apnapos.com](https://community.apnapos.com)
* **Twitter**: [@ApnaPOS](https://twitter.com/apnapos)
* **Discord**: [Join our Discord](https://discord.gg/apnapos)

---

**Built with ❤️ for modern retail businesses worldwide**

---

*⭐ Star this repository if it helps your business!*
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
