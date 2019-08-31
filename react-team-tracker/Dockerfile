FROM node:10.16.3-alpine
RUN mkdir /react
WORKDIR /react
COPY package.json /react/
RUN npm install
COPY . /react/