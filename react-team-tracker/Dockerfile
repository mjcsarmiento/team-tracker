FROM node:10.16.3-alpine

WORKDIR /react
COPY package.json /react

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
