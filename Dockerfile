FROM node:lts-alpine
EXPOSE 3000
WORKDIR /www
RUN --mount=type=bind,source=./package.json,target=./package.json \
    --mount=type=bind,source=./package-lock.json,target=./package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY ./bin ./bin
COPY ./locales ./locales
COPY ./public ./public
COPY ./src ./src
COPY ./views ./views
COPY ./global.d.ts .
COPY ./tsconfig.json .
COPY ./watch.sh .
COPY ./watch.ts .
CMD ["./watch.sh"]
