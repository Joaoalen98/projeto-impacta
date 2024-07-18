FROM node:lts-alpine3.20 AS build
RUN npm install -g @angular/cli
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN ng build
WORKDIR /build/dist/front-end/browser

FROM nginx:stable-alpine3.19-slim AS release
ENV API_URL=''
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist/front-end/browser .
