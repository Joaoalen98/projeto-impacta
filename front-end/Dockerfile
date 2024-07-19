FROM node:lts-alpine3.20 AS build
RUN npm install -g @angular/cli
WORKDIR /build
COPY package*.json .
RUN npm install
COPY . .
RUN ng build --output-path dist

FROM nginx:stable-alpine3.19-slim AS release
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist/browser .
