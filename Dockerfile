# Step 1: Use the official Node.js runtime environment
FROM node:20-alpine

# Step 2: Create and set the application directory
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your app's source code
COPY . .

# Step 5: Build the application (standard for Vite/Next.js apps)
# If your project doesn't have a build script, you can remove this line
RUN npm run build --if-present

# Step 6: Expose the port the app runs on
# Note: Easypanel needs to know this port. Usually it's 3000, 5173 (Vite), or 8080.
EXPOSE 3000

# Step 7: Start the application
# For production, we usually use 'npm start'. If it's a pure dev template, 'npm run dev' works too.
CMD ["npm", "start"]
