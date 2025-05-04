# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application source code into the container
COPY . .

# Default command to install (again) and launch your WebdriverIO tests.
# Note: The command in docker-compose.yml can override this CMD.
CMD ["sh", "-c", "npm install"]