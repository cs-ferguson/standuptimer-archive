FROM node:alpine

RUN apk add --update git && \
  rm -rf /tmp/* /var/cache/apk/*

ADD . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8080

#set npm registry for speed
RUN npm install

CMD ["npm", "run", "hotstuff"]
