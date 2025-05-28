import { type Logger, transports } from "winston";

export function addTransports(logger: Logger) {
  logger.add(new transports.Console());
}
