#!/bin/sh
set -o errexit

sed \
  --expression="s/\${REDIS_APP_USER}/$REDIS_APP_USER/g" \
  --expression="s/\${REDIS_APP_PASSWORD}/$REDIS_APP_PASSWORD/g" \
  --expression="s/\${REDIS_ROOT_USER}/$REDIS_ROOT_USER/g" \
  --expression="s/\${REDIS_ROOT_PASSWORD}/$REDIS_ROOT_PASSWORD/g" \
  /etc/redis/users.acl.template > /etc/redis/users.acl
