export const storageEnv = {
  bucket: String(process.env.STORAGE_BUCKET),
  host: String(process.env.STORAGE_HOST),
  port: Number(process.env.STORAGE_PORT),
  secure: String(process.env.STORAGE_SECURE) === "true",
  user: String(process.env.STORAGE_APP_USER),
  password: String(process.env.STORAGE_APP_PASSWORD),
};
