#!/bin/sh
set -o errexit

npx tsc --watch --watchFile dynamicPriorityPolling &
CHOKIDAR_USEPOLLING=true npx tsx watch \
  --import=./bin/instrumentation.ts \
  --import=./watch.ts \
  --inspect=0.0.0.0:9229 \
  ./bin/www.ts &
npx sass \
  --load-path=./node_modules/@picocss/pico/scss \
  --poll \
  --style=expanded \
  --watch \
  ./public/styles/main.scss ./public/styles/main.css &
wait
