FROM node:18.20.0

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm", "run", "start:prod"]
