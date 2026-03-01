FROM eclipse-temurin:17-jdk-alpine

# Install curl for health check
RUN apk add --no-cache curl

WORKDIR /app

# Copy Maven wrapper and pom.xml first for better Docker layer caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 5000

# Run the application
ENTRYPOINT ["java", "-jar", "target/pos-system-0.0.1-SNAPSHOT.jar"]
