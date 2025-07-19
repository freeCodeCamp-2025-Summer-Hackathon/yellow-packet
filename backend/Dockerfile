FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
