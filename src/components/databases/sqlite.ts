import sqlite3 from "sqlite3";
import { env } from "../env";
import { logger } from "../logger";

const client = new sqlite3.Database(env.sqlite.url);

async function connect() {
  logger.info("SQLite database is connecting");
  return Promise.resolve(client);
}

async function disconnect() {
  logger.info("SQLite database is disconnecting");
  return new Promise<void>((resolve, reject) => {
    client.close((error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
}

/* istanbul ignore next */
async function ping() {
  logger.info("SQLite database is pinging");
  return new Promise((resolve, reject) => {
    client.get<{
      integrity_check: string;
    }>("PRAGMA integrity_check;", [], (error, ping) => {
      if (error) {
        return reject(error);
      }

      return resolve(ping.integrity_check === "ok");
    });
  });
}

export const sqliteDatabase = {
  client,
  connect,
  disconnect,
  ping,
};
