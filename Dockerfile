FROM node:4.3.0

WORKDIR /bookmarklets
COPY . /bookmarklets

RUN npm install -gq grunt-cli \
    && npm install -q \
    && make

EXPOSE 9001

CMD ["make", "serve"]
