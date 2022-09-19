FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8000
CMD yarn install && \
    yarn knex migrate:latest && \
    yarn start