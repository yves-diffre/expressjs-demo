#!/bin/sh
set -o errexit

mc alias set storage http://"$STORAGE_HOST":"$STORAGE_PORT" "$STORAGE_ROOT_USER" "$STORAGE_ROOT_PASSWORD"

mc mb storage/"$STORAGE_BUCKET" || true

ANONYMOUS_POLICY=$(mktemp)
cat <<-EOJSON > "$ANONYMOUS_POLICY"
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": ["s3:GetObject"],
        "Effect": "Allow",
        "Principal": {
          "AWS": ["*"]
        },
        "Resource": ["arn:aws:s3:::$STORAGE_BUCKET/*"]
      }
    ]
  }
EOJSON
mc anonymous set-json "$ANONYMOUS_POLICY" storage/"$STORAGE_BUCKET"
rm "$ANONYMOUS_POLICY"

APP_POLICY=$(mktemp)
cat <<-EOJSON > "$APP_POLICY"
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": ["s3:DeleteObject", "s3:PutObject"],
        "Effect": "Allow",
        "Principal": {
          "AWS": ["*"]
        },
        "Resource": ["arn:aws:s3:::$STORAGE_BUCKET/*"]
      }
    ]
  }
EOJSON
mc admin policy create storage app "$APP_POLICY"
rm "$APP_POLICY"

mc admin user add storage "$STORAGE_APP_USER" "$STORAGE_APP_PASSWORD"
mc admin policy attach storage app --user="$STORAGE_APP_USER"
