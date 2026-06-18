# --- Step 1: Build the application ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Pass the API key during build time so Vite can bake it into the frontend if needed
ARG GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Build the static production files (generates a 'dist' or 'build' folder)
RUN npm run build

# --- Step 2: Serve with Nginx ---
FROM nginx:alpine

# Clean default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files from the builder stage
# (Vite outputs to 'dist'. If your project uses 'build', change 'dist' to 'build')
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Failsafe routing config for single-page apps
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
