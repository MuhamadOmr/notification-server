FROM node:alpine

WORKDIR /push-notification-service

COPY wait-for /wait-for

RUN chmod +x /wait-for

COPY package.json .

RUN npm install

COPY . .