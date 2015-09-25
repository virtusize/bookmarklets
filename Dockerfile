FROM node:0.12

MAINTAINER hannes@virtusize.com

RUN npm install -g grunt-cli

WORKDIR /bookmarklets
ADD package.json package.json
RUN npm install

ADD . /bookmarklets
RUN grunt

EXPOSE "9001"

CMD ["grunt", "connect:server"]
