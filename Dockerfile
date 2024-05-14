FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 1025
CMD ["yarn", "start"]