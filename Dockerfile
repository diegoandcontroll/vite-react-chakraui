FROM node:lts-alpine as builder

WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html
