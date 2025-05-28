import { createClient } from "redis";
import { env } from "../env";
import { logger } from "../logger";

const client = createClient({
  url: env.redis.url
    .replace("<database>", env.redis.database)
    .replace("<host>", env.redis.host)
    .replace("<port>", env.redis.port)
    .replace("<user>", env.redis.user)
    .replace("<password>", env.redis.password),
});

async function connect() {
  logger.info("Redis database is connecting");
  return client.connect();
}

async function disconnect() {
  logger.info("Redis database is disconnecting");
  return client.close();
}

/* istanbul ignore next */
async function ping() {
  logger.info("Redis database is pinging");
  const ping = await client.ping();
  return ping === "PONG";
}

export const redisDatabase = {
  client,
  connect,
  disconnect,
  ping,
};
