FROM node:lts-alpine

WORKDIR /app

COPY NextJS/package*.json ./

RUN npm install

COPY NextJS/. .
EXPOSE 3000

CMD ["npm", "run", "dev"]