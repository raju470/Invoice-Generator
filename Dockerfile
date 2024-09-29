# Use a Debian-based Node.js runtime as a parent image
FROM node:18

# Install required dependencies for PhantomJS and OpenSSL
RUN apt-get update && apt-get install -y \
    libfontconfig1 \
    libfreetype6 \
    libx11-6 \
    libxext6 \
    libxrender1 \
    fonts-freefont-ttf \
    openssl \
    bash \
    && npm install -g phantomjs-prebuilt

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
