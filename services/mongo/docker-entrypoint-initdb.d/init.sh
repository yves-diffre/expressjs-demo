#!/bin/sh
set -o errexit

mongosh --eval <<-EOJS
  db = db.getSiblingDB("$MONGO_DATABASE");

  db.createCollection("articles", {
    validator: {
      \$jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        properties: {
          _id: {
            bsonType: "binData",
          },
          dateCreated: {
            bsonType: "date",
          },
          dateModified: {
            bsonType: "date",
          },
          description: {
            bsonType: "string",
            maxLength: 250,
            minLength: 1,
          },
          image: {
            bsonType: "string",
            maxLength: 100,
            minLength: 1,
          },
          name: {
            bsonType: "string",
            maxLength: 100,
            minLength: 1,
          },
          text: {
            bsonType: "string",
            minLength: 1,
          },
        },
        required: ["_id", "dateCreated", "description", "image", "name", "text"],
      },
    },
  });
  db.articles.createIndex({
    dateCreated: 1,
  });
  db.articles.createIndex({
    name: 1,
  });

  db.createUser({
    user: "$MONGO_APP_USER",
    pwd: "$MONGO_APP_PASSWORD",
    roles: [
      {
        db: "$MONGO_DATABASE",
        role: "readWrite",
      },
    ],
  });
EOJS
