import type { Express } from "express";
import { routes } from "../routes";

export function addRoutesMiddleware(app: Express) {
  app.use(routes);
}
