FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

ENV PORT 8080
EXPOSE $PORT

CMD [ "npm", "start" ]