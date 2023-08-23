FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./
COPY .env.local ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
