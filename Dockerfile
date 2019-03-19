FROM node:10.15.2-alpine AS iris

RUN apk --no-cache add git ca-certificates make

ADD . /home/app/api
WORKDIR /home/app/api

RUN yarn

CMD ["docker/entrypoint.sh"]

