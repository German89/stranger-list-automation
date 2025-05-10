# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Install dependencies including Git
RUN apt-get update && \
    apt-get install -y wget curl unzip xvfb git && \
    apt-get install -y wget curl unzip xvfb chromium-driver && \
    rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
# Clone WebdriverIO test repository
RUN git clone -b chromeuser-dir --single-branch https://github.com/German89/stranger-list-automation.git
