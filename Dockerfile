FROM node:14-alpine 

RUN mkdir -p /apps/highway-access-api

WORKDIR /apps/highway-access-api

COPY package.json /apps/highway-access-api

RUN npm install

COPY . /apps/highway-access-api

RUN npm run prebuild
RUN npm run build
