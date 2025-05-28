export const postgresEnv = {
  database: String(process.env.POSTGRES_DATABASE),
  host: String(process.env.POSTGRES_HOST),
  port: String(process.env.POSTGRES_PORT),
  url: String(process.env.POSTGRES_URL),
  user: String(process.env.POSTGRES_APP_USER),
  password: String(process.env.POSTGRES_APP_PASSWORD),
};
