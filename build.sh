#!/bin/sh
set -o errexit

mkdir --parents ./dist
node ./build.js &
npx sass \
  --load-path=./node_modules/@picocss/pico/scss \
  --style=compressed \
  ./public/styles/main.scss ./dist/public/styles/main.css &
find ./locales ./public ./views ! -name ".gitignore" ! -name "*.scss" -type f | while read -r file;
do
  cp --parents "$file" ./dist;
done &
wait
