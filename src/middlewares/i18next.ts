import type { Express } from "express";
import { handle } from "i18next-http-middleware";
import { i18n } from "../components/i18n";

export function addI18nextMiddleware(app: Express) {
  app.use(handle(i18n));
}
