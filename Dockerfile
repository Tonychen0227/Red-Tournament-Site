# Multi-stage build for Angular application
# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the Angular application for production
RUN npm run build -- --configuration production

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy the built Angular app from the build stage (note: Angular 18+ outputs to browser subdirectory)
COPY --from=build /app/dist/speedrunred-client/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check for nginx
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]