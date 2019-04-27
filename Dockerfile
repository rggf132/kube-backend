FROM node:10

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prod:build

EXPOSE 3000

CMD npm run prod:start