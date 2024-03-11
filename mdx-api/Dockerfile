# Use node v18
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy both package.json AND package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# We expose a non standard port like 8080, and we'll map it to 3000 when running the container
EXPOSE 8080
CMD [ "node", "index.js" ]