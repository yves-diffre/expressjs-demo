import { MongoClient } from "mongodb";
import { env } from "../env";
import { logger } from "../logger";

const client = new MongoClient(
  env.mongo.url
    .replace("<database>", env.mongo.database)
    .replace("<host>", env.mongo.host)
    .replace("<port>", env.mongo.port)
    .replace("<user>", env.mongo.user)
    .replace("<password>", env.mongo.password),
);

async function connect() {
  logger.info("Mongo database is connecting");
  return client.connect();
}

async function disconnect() {
  logger.info("Mongo database is disconnecting");
  return client.close();
}

/* istanbul ignore next */
async function ping() {
  logger.info("Mongo database is pinging");
  const ping = await client.db().command({
    ping: 1,
  });
  return ping.ok === 1;
}

export const mongoDatabase = {
  client,
  connect,
  disconnect,
  ping,
};
