# POS System Deployment Guide

## System Architecture Overview

This is a comprehensive Point of Sale (POS) system for D Mart with the following architecture:

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.5.3 with Java 17
- **Database**: MySQL 8.0
- **Authentication**: JWT with Spring Security
- **Payment Integration**: Razorpay & Stripe
- **Email**: Gmail SMTP
- **Build Tool**: Maven with Jib plugin for Docker

### Frontend (React + Vite)
- **Framework**: React 19.1.0 with Vite 7.0.0
- **UI Library**: Radix UI components with TailwindCSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Forms**: React Hook Form with Zod validation

## Prerequisites

### Development Environment
- **Java**: JDK 17 or higher
- **Node.js**: Version 18 or higher
- **Maven**: Version 3.6 or higher
- **MySQL**: Version 8.0 or higher
- **Git**: For version control

### Production Environment
- **Docker**: Latest version
- **Docker Compose**: Version 3.8 or higher
- **Cloud Server**: AWS EC2, Google Cloud, or similar
- **Domain Name**: For SSL certificate (optional but recommended)

## Environment Configuration

### Backend Environment Variables

Create `.env` file in `pos-backend` directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pos
DB_USERNAME=root
DB_PASSWORD=your_database_password

# Server Configuration
SERVER_PORT=5000

# Email Configuration (Gmail)
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-gmail-app-password

# Payment Gateway Configuration
RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret
STRIPE_API_KEY=your_stripe_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Frontend URL
APP_FRONTEND_RESET_URL=http://localhost:5173/auth/reset-password?token=

# Optional: Gemini AI API
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend Environment Variables

Create `.env` file in `pos-frontend-vite` directory:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key
VITE_STRIPE_KEY=your_stripe_publishable_key
```

## Development Setup

### 1. Database Setup

```bash
# Start MySQL (using Docker)
docker run --name mysql-pos -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=pos -p 3306:3306 -d mysql:8.0

# Or install MySQL locally
sudo apt-get install mysql-server
mysql -u root -p
CREATE DATABASE pos;
```

### 2. Backend Setup

```bash
cd pos-backend

# Install dependencies and build
./mvnw clean install

# Run the application
./mvnw spring-boot:run

# Or run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 3. Frontend Setup

```bash
cd pos-frontend-vite

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Docker Deployment

### 1. Create Dockerfile for Backend

Create `Dockerfile` in `pos-backend` directory:

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/pos-system-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 2. Create Dockerfile for Frontend

Create `Dockerfile` in `pos-frontend-vite` directory:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3. Create nginx.conf for Frontend

Create `nginx.conf` in `pos-frontend-vite` directory:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://pos-system:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### 4. Update docker-compose.yml

Update the existing `docker-compose.yml`:

```yaml
version: "3.8"

services:
  posdb:
    image: mysql:8.0
    container_name: posdb
    ports:
      - "3301:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: pos
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 10s
      retries: 10
      interval: 10s
      start_period: 10s
    networks:
      - pos-network

  pos-backend:
    build: ./pos-backend
    container_name: pos-backend
    depends_on:
      posdb:
        condition: service_healthy
    ports:
      - "5000:5000"
    environment:
      DB_HOST: posdb
      DB_PORT: 3306
      DB_NAME: pos
      DB_USERNAME: root
      DB_PASSWORD: root
      SPRING_MAIL_HOST: smtp.gmail.com
      SPRING_MAIL_PORT: 587
      SPRING_MAIL_USERNAME: your-email@gmail.com
      SPRING_MAIL_PASSWORD: your-gmail-app-password
      RAZORPAY_API_KEY: your_razorpay_key
      RAZORPAY_API_SECRET: your_razorpay_secret
      STRIPE_API_KEY: your_stripe_key
    networks:
      - pos-network

  pos-frontend:
    build: ./pos-frontend-vite
    container_name: pos-frontend
    ports:
      - "80:80"
    depends_on:
      - pos-backend
    networks:
      - pos-network

volumes:
  mysql_data:

networks:
  pos-network:
    driver: bridge
```

## Production Deployment

### 1. Build and Deploy with Docker Compose

```bash
# Build and start all services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 2. Production Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone <your-repository-url>
cd <repository-name>

# Configure environment variables
cp .env.example .env
# Edit .env with production values

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### 3. SSL Certificate Setup (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Maintenance

### Health Checks

```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs pos-backend
docker-compose logs pos-frontend
docker-compose logs posdb

# Database backup
docker exec posdb mysqldump -u root -proot pos > backup.sql
```

### Scaling

```bash
# Scale backend services
docker-compose up -d --scale pos-backend=3

# Load balancer configuration (nginx example)
upstream pos_backend {
    server pos-backend:5000;
    # Add more instances if scaled
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check if MySQL container is running: `docker ps`
   - Verify database credentials in environment variables
   - Check network connectivity between containers

2. **Frontend Not Loading**
   - Check nginx configuration
   - Verify API endpoints are accessible
   - Check browser console for errors

3. **Payment Gateway Issues**
   - Verify API keys are correct
   - Check webhook URLs are accessible
   - Review payment gateway logs

### Log Locations

- **Backend Logs**: `docker-compose logs pos-backend`
- **Frontend Logs**: `docker-compose logs pos-frontend`
- **Database Logs**: `docker-compose logs posdb`

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **Database Security**: Use strong passwords and restrict access
3. **API Security**: Implement rate limiting and input validation
4. **SSL/TLS**: Always use HTTPS in production
5. **Regular Updates**: Keep dependencies and Docker images updated

## Performance Optimization

1. **Database**: Implement proper indexing and query optimization
2. **Caching**: Use Redis for session management and caching
3. **CDN**: Use Content Delivery Network for static assets
4. **Load Balancing**: Implement load balancer for high availability

## Support

For issues and questions:
1. Check logs for error messages
2. Verify environment configuration
3. Test individual components separately
4. Review this documentation for common solutions
