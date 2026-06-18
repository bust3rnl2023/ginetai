# Step 1: Use the official Node.js runtime environment
FROM node:20-alpine

# Step 2: Create and set the application directory
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your app's source code
COPY . .

# Step 5: Force overwrite vite.config.js to allow all hostnames
RUN echo "import { defineConfig } from 'vite'; \
import react from '@vitejs/plugin-react'; \
export default defineConfig({ \
  plugins: [react()], \
  server: { \
    host: '0.0.0.0', \
    port: 3000, \
    allowedHosts: true \
  } \
});" > vite.config.js

# Step 6: Expose the Vite port
EXPOSE 3000

# Step 7: Force environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Step 8: Start the application
CMD ["npm", "run", "dev"]
