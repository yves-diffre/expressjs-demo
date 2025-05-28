import type { Express } from "express";
import passport from "passport";

export function addPassportMiddleware(app: Express) {
  app.use(passport.authenticate("session"));
}
