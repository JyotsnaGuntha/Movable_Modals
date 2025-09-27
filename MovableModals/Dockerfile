# Multi-stage build for DeepLure Research Task - Movable Modal React Application
# Stage 1: Build the application
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# Create dist.tar.gz file as required by assignment
RUN tar -czf dist.tar.gz -C dist .

# Verify build output
RUN ls -la dist/ && echo "Build completed successfully"

# Stage 2: Production stage with nginx
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the dist.tar.gz file for deployment
COPY --from=build /app/dist.tar.gz /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]