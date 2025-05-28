import { logger } from "../logger";
import { mongoDatabase } from "./mongo";
import { postgresDatabase } from "./postgres";
import { redisDatabase } from "./redis";
import { sqliteDatabase } from "./sqlite";

async function connect() {
  logger.info("Databases are connecting");
  return Promise.all(
    [mongoDatabase, postgresDatabase, redisDatabase, sqliteDatabase].map((database) => {
      return database.connect();
    }),
  );
}

async function disconnect() {
  logger.info("Databases are disconnecting");
  return Promise.all(
    [mongoDatabase, postgresDatabase, redisDatabase, sqliteDatabase].map((database) => {
      return database.disconnect();
    }),
  );
}

/* istanbul ignore next */
async function ping() {
  logger.info("Databases are pinging");
  return Promise.all(
    [mongoDatabase, postgresDatabase, redisDatabase, sqliteDatabase].map((database) => {
      return database.ping();
    }),
  );
}

export { ConflictError } from "./ConflictError";

export { UnknownEntityError } from "./UnknownEntityError";

export const databases = {
  client: {
    mongo: mongoDatabase.client,
    postgres: postgresDatabase.client,
    redis: redisDatabase.client,
    sqlite: sqliteDatabase.client,
  },
  connect,
  disconnect,
  ping,
};
