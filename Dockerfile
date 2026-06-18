# Step 1: Use the official Node.js runtime environment
FROM node:20-alpine

# Step 2: Create and set the application directory
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your app's source code
COPY . .

# Step 5: Expose the common development port (Vite uses 5173, Next.js uses 3000)
# We'll expose 5173 since it's the standard for modern Google AI Studio frontend apps
EXPOSE 5173

# Step 6: Force the app to run on host 0.0.0.0 so Easypanel can access it
ENV HOST=0.0.0.0

# Step 7: Start the application using the dev script
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
