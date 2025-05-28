import { appEnv } from "./app";
import { instrumentationEnv } from "./instrumentation";
import { mailerEnv } from "./mailer";
import { mongoEnv } from "./mongo";
import { postgresEnv } from "./postgres";
import { redisEnv } from "./redis";
import { sqliteEnv } from "./sqlite";
import { storageEnv } from "./storage";

export const env = {
  app: appEnv,
  instrumentation: instrumentationEnv,
  mailer: mailerEnv,
  mongo: mongoEnv,
  postgres: postgresEnv,
  redis: redisEnv,
  sqlite: sqliteEnv,
  storage: storageEnv,
};
