# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install dependencies including Git
RUN apt-get update && \
    apt-get install -y wget curl unzip xvfb git && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
# Clone WebdriverIO test repository
RUN git clone https://github.com/German89/stranger-list-automation.git . && \
    npm install

# Run tests
CMD ["npx", "wdio", "run", "wdio.conf.js"]