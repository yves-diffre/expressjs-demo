export const mongoEnv = {
  database: String(process.env.MONGO_DATABASE),
  host: String(process.env.MONGO_HOST),
  port: String(process.env.MONGO_PORT),
  url: String(process.env.MONGO_URL),
  user: String(process.env.MONGO_APP_USER),
  password: String(process.env.MONGO_APP_PASSWORD),
};
