import { DockerComposeEnvironment, type StartedDockerComposeEnvironment } from "testcontainers";
import "./jest.env";

let environment: StartedDockerComposeEnvironment;

async function setup() {
  environment = await new DockerComposeEnvironment(".", "compose.yaml").up([
    "mongo",
    "postgres",
    "redis",
  ]);

  const mongoContainer = environment.getContainer("mongo-1");
  process.env.MONGO_HOST = mongoContainer.getHost();
  process.env.MONGO_PORT = mongoContainer.getMappedPort(27017).toString();

  const postgresContainer = environment.getContainer("postgres-1");
  process.env.POSTGRES_HOST = postgresContainer.getHost();
  process.env.POSTGRES_PORT = postgresContainer.getMappedPort(5432).toString();

  const redisContainer = environment.getContainer("redis-1");
  process.env.REDIS_HOST = redisContainer.getHost();
  process.env.REDIS_PORT = redisContainer.getMappedPort(6379).toString();
}

async function teardown() {
  await environment.down();
}

export const globalActions = {
  setup,
  teardown,
};
