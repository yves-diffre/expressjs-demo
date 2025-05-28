export const redisEnv = {
  database: String(process.env.REDIS_DATABASE),
  host: String(process.env.REDIS_HOST),
  port: String(process.env.REDIS_PORT),
  url: String(process.env.REDIS_URL),
  user: String(process.env.REDIS_APP_USER),
  password: String(process.env.REDIS_APP_PASSWORD),
};
