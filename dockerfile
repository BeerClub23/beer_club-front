# Use the official Node.js 18.16 image as the base image
FROM node:18.16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code to the working directory
COPY . .

# Compile TypeScript code
RUN npx tsc

# Build the Next.js app
RUN npm run build

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]