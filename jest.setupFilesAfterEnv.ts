import { databases } from "./src/components/databases";
import { logger } from "./src/components/logger";

for (const transport of logger.transports) {
  transport.silent = true;
}

beforeAll(async () => {
  await databases.connect();
});

afterAll(async () => {
  await databases.disconnect();
});
