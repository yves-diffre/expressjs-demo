import { RedisStore } from "connect-redis";
import type { Express } from "express";
import session from "express-session";
import { databases } from "../components/databases";
import { env } from "../components/env";

export function addSessionMiddleware(app: Express) {
  app.use(
    session({
      cookie: {
        maxAge: 1 * 60 * 1000,
        sameSite: "strict",
        secure: env.app.session.secure,
      },
      resave: false,
      saveUninitialized: false,
      secret: env.app.session.secret,
      store: new RedisStore({
        client: databases.client.redis,
        prefix: `${env.app.session.name}:`,
      }),
    }),
  );
}
