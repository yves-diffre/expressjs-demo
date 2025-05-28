export const mailerEnv = {
  host: String(process.env.MAILER_HOST),
  port: Number(process.env.MAILER_PORT),
  secure: String(process.env.MAILER_SECURE) === "true",
  user: String(process.env.MAILER_APP_USER),
  password: String(process.env.MAILER_APP_PASSWORD),
};
