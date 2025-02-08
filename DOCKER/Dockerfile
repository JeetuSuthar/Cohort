# Use the correct Node.js Alpine image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the correct port (match your Express server)
EXPOSE 5000

# Command to start the server
CMD ["node", "index.js"]
