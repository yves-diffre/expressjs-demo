import type { Express, NextFunction, Request, Response } from "express";

export function addFlashMiddleware(app: Express) {
  app.response.flash = function (flash) {
    this.req.session.flash = flash;
    return this;
  };
  app.use((request: Request, response: Response, next: NextFunction) => {
    const key = "flash";
    const flash = request.session[key];
    delete request.session[key];
    response.locals[key] = flash;
    return next();
  });
}
