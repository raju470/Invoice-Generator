# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install required dependencies for Puppeteer
RUN apk add --no-cache \
    udev \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    fontconfig

# Set the environment variable for Puppeteer to use the installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV CHROME_BIN=/usr/bin/chromium-browser

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
