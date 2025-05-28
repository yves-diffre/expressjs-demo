import http from "node:http";
import { createTerminus } from "@godaddy/terminus";
import { app } from "../src/app";
import { databases } from "../src/components/databases";
import { env } from "../src/components/env";
import { logger } from "../src/components/logger";

const server = http
  .createServer(app)
  .on("listening", () => {
    const address = server.address();
    if (address) {
      const bind = typeof address === "string" ? `pipe ${address}` : `port ${address.port}`;
      logger.info(`Server is listening on ${bind}`);
    }
  })
  .on("error", (error: NodeJS.ErrnoException) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    if (error.code === "EACCES") {
      logger.error("Server requires elevated privileges");
      process.exit(1);
    } else if (error.code === "EADDRINUSE") {
      logger.error("Server is already in use");
      process.exit(1);
    } else {
      throw error;
    }
  });
createTerminus(server, {
  healthChecks: {
    __unsafeExposeStackTraces: env.app.debug,
    verbatim: true,
    "/health-check": async () => {
      logger.info("Server is checking health");
      await databases.ping();
    },
  },
  logger: logger.error,
  signals: ["SIGINT", "SIGTERM"],
  useExit0: true,
  beforeShutdown: async () => {
    logger.info("Server is waiting before shutdown");
    await new Promise((resolve) => {
      setTimeout(resolve, env.app.liveness);
    });
  },
  onSignal: async () => {
    logger.info("Server is shutting down");
    await databases.disconnect();
  },
  onShutdown: async () => {
    logger.info("Server is shut down");
    await Promise.resolve();
  },
});

(async () => {
  try {
    logger.info("Server is starting");
    await databases.connect();
    server.listen(env.app.port, env.app.host);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
