#!/bin/sh
set -o errexit

psql --dbname="$POSTGRES_DATABASE" --username="$POSTGRES_ROOT_USER" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS "app";

  CREATE TABLE IF NOT EXISTS "app"."articles" (
    "_id" uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    "dateCreated" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dateModified" timestamp DEFAULT NULL,
    "description" varchar(250) NOT NULL,
    "image" varchar(100) NOT NULL,
    "name" varchar(100) NOT NULL,
    "text" text NOT NULL
  );
  CREATE INDEX "dateCreated_idx" ON "app"."articles" ("dateCreated");
  CREATE INDEX "name_idx" ON "app"."articles" ("name");

  CREATE USER "$POSTGRES_APP_USER" WITH PASSWORD '$POSTGRES_APP_PASSWORD';
  GRANT CONNECT ON DATABASE "$POSTGRES_DATABASE" TO "$POSTGRES_APP_USER";
  GRANT USAGE ON SCHEMA "app" TO "$POSTGRES_APP_USER";
  GRANT DELETE, INSERT, SELECT, UPDATE ON ALL TABLES IN SCHEMA "app" TO "$POSTGRES_APP_USER";
EOSQL
