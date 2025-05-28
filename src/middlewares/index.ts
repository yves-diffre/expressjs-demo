import type { Express } from "express";
import { addBusboyMiddleware } from "./busboy";
import { addFlashMiddleware } from "./flash";
import { addI18nextMiddleware } from "./i18next";
import { addMorganMiddleware } from "./morgan";
import { addPassportMiddleware } from "./passport";
import { addRoutesMiddleware } from "./routes";
import { addSessionMiddleware } from "./session";

export function addMiddlewares(app: Express) {
  addBusboyMiddleware(app);
  addI18nextMiddleware(app);
  addMorganMiddleware(app);
  addSessionMiddleware(app);
  addFlashMiddleware(app);
  addPassportMiddleware(app);
  addRoutesMiddleware(app);
}
