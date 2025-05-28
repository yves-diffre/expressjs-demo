import { createLogger, format } from "winston";
import { env } from "../env";
import { addTransports } from "./transports";

export const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf((info) => {
      return JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
        stack: info.stack,
      });
    }),
  ),
  level: env.app.logLevel,
});
addTransports(logger);
