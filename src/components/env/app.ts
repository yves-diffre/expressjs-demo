export const appEnv = {
  debug: String(process.env.APP_DEBUG) === "true",
  domain: String(process.env.APP_DOMAIN),
  host: String(process.env.APP_HOST),
  liveness: Number(process.env.APP_LIVENESS),
  logLevel: String(process.env.APP_LOG_LEVEL),
  mail: String(process.env.APP_MAIL),
  port: Number(process.env.APP_PORT),
  session: {
    name: String(process.env.APP_SESSION_NAME),
    secret: String(process.env.APP_SESSION_SECRET),
    secure: String(process.env.APP_SESSION_SECURE) === "true",
  },
};
