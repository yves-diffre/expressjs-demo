import pg from "pg";
import { env } from "../env";
import { logger } from "../logger";

const client = new pg.Pool({
  connectionString: env.postgres.url
    .replace("<database>", env.postgres.database)
    .replace("<host>", env.postgres.host)
    .replace("<port>", env.postgres.port)
    .replace("<user>", env.postgres.user)
    .replace("<password>", env.postgres.password),
});

async function connect() {
  logger.info("Postgres database is connecting");
  return Promise.resolve(client);
}

async function disconnect() {
  logger.info("Postgres database is disconnecting");
  return client.end();
}

/* istanbul ignore next */
async function ping() {
  logger.info("Postgres database is pinging");
  const ping = (
    await client.query<{
      ok: number;
    }>({
      text: `
        SELECT
          1 AS "ok"
      `,
    })
  ).rows[0];
  return ping?.ok === 1;
}

export const postgresDatabase = {
  client,
  connect,
  disconnect,
  ping,
};
