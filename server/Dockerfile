FROM node:alpine

ADD . /usr/src/server
WORKDIR /usr/src/server

RUN npm install

EXPOSE 8083

CMD ["node", "server.js"]
