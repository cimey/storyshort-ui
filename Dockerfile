# Stage 1: Build the Angular app
FROM node:lts-slim AS builder

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build Angular app
RUN ng build --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy built Angular app from builder
COPY --from=builder /app/dist/storyshort-ui/browser /usr/share/nginx/html

# Remove default nginx config and copy custom one (optional)
# Replace default NGINX config with your own
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
