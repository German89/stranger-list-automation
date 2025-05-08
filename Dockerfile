# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Install dependencies including Git
RUN apt-get update && \
    apt-get install -y wget curl unzip xvfb git && \
    apt-get install -y wget curl unzip xvfb chromium-driver && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
# Clone WebdriverIO test repository
RUN git clone https://github.com/German89/stranger-list-automation.git .

# Install dependencies
RUN npm install

# Start Chromedriver on port 9515
CMD chromedriver --port=9515 &

RUN npm install

RUN npx wdio run wdio.conf.js --PORT=9515