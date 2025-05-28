import { createTransport } from "nodemailer";
import { env } from "../env";

export const mailer = createTransport({
  host: env.mailer.host,
  port: env.mailer.port,
  secure: env.mailer.secure,
  auth: {
    user: env.mailer.user,
    pass: env.mailer.password,
  },
});
