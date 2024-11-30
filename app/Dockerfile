FROM node:22.11.0-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

USER node

COPY . .

EXPOSE 3000

CMD npm start
