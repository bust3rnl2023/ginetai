# Step 1: Use the official Node.js runtime environment
FROM node:20-alpine

# Step 2: Create and set the application directory
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your app's source code
COPY . .

# Step 5: Inject allowedHosts configuration into vite.config.js dynamically
RUN node -e " \
const fs = require('fs'); \
if (fs.existsSync('vite.config.js')) { \
  let content = fs.readFileSync('vite.config.js', 'utf8'); \
  if (content.includes('server:')) { \
    content = content.replace('server:', 'server: { allowedHosts: true, '); \
  } else if (content.includes('defineConfig({')) { \
    content = content.replace('defineConfig({', 'defineConfig({\n  server: { allowedHosts: true },'); \
  } \
  fs.writeFileSync('vite.config.js', content); \
}"

# Step 6: Expose the Vite port
EXPOSE 3000

# Step 7: Force the app to run on host 0.0.0.0
ENV HOST=0.0.0.0

# Step 8: Start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
