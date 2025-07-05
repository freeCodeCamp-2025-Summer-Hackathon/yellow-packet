FROM node:latest AS build
WORKDIR /backend
COPY /backend/package.json ./
RUN npm install
COPY ./backend ./
EXPOSE 5000
CMD ["node", "server.js"]
