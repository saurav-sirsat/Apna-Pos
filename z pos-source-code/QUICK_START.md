# Quick Start Guide - POS System

## 🚀 One-Command Development Setup

### Prerequisites
- Docker and Docker Compose installed
- Git installed

### Step 1: Clone and Setup
```bash
git clone <your-repository-url>
cd pos-source-code
```

### Step 2: Environment Configuration
```bash
# Copy environment templates
cp pos-backend/.env.example pos-backend/.env
cp pos-frontend-vite/.env.example pos-frontend-vite/.env

# Edit the .env files with your actual configuration
nano pos-backend/.env
nano pos-frontend-vite/.env
```

### Step 3: Start Everything
```bash
# Build and start all services
docker-compose up -d --build

# Watch the logs (optional)
docker-compose logs -f
```

### Step 4: Access the Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **Database**: localhost:3301 (MySQL)

## 🛠️ Manual Development Setup

If you prefer to develop without Docker:

### Backend Setup
```bash
cd pos-backend

# Install dependencies
./mvnw clean install

# Start MySQL (if not using Docker)
# mysql -u root -p
# CREATE DATABASE pos;

# Run the application
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd pos-frontend-vite

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Required Environment Variables

### Backend (.env)
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pos
DB_USERNAME=root
DB_PASSWORD=your_password

# Email (for password reset)
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password

# Payment Gateways
RAZORPAY_API_KEY=your_key
RAZORPAY_API_SECRET=your_secret
STRIPE_API_KEY=your_key

# Security
JWT_SECRET=your_long_random_secret_key
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_publishable_key
VITE_STRIPE_KEY=your_stripe_publishable_key
```

## 🔧 Common Commands

### Docker Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild specific service
docker-compose up -d --build pos-backend

# Access database
docker exec -it posdb mysql -u root -p
```

### Development Commands
```bash
# Backend
cd pos-backend
./mvnw spring-boot:run
./mvnw test

# Frontend
cd pos-frontend-vite
npm run dev
npm run build
npm run test
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :5000
sudo lsof -i :80

# Kill the process
sudo kill -9 <PID>
```

### Database Connection Issues
```bash
# Check MySQL container
docker-compose ps posdb

# Check database logs
docker-compose logs posdb

# Reset database
docker-compose down -v
docker-compose up -d posdb
```

### Permission Issues
```bash
# Fix Maven wrapper permissions
chmod +x pos-backend/mvnw

# Fix Docker permissions
sudo usermod -aG docker $USER
# Then logout and login again
```

## 📚 Next Steps

1. **Read the full deployment guide**: `DEPLOYMENT_GUIDE.md`
2. **Configure payment gateways**: Set up Razorpay/Stripe accounts
3. **Set up email**: Configure Gmail App Password for email features
4. **Explore the codebase**: Check controllers, services, and models
5. **Run tests**: Ensure everything works before deployment

## 🆘 Getting Help

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Ensure all ports are available
4. Check the full deployment guide for detailed instructions

## 🎯 You're Ready!

Once you complete these steps, you'll have a fully functional POS system running locally with:

Happy coding! 🚀
