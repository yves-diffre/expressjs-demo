import type { Express } from "express";
import morgan from "morgan";
import { logger } from "../components/logger";

export function addMorganMiddleware(app: Express) {
  app.use(
    morgan(
      ':req[X-Request-Id] - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
      {
        stream: {
          write: (message) => {
            return logger.http(message);
          },
        },
      },
    ),
  );
}
