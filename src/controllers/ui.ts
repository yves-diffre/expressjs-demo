import type { NextFunction, Request, Response } from "express";
import { env } from "../components/env";
import { http, HttpError } from "../components/http";
import { uiAuthControllers } from "./uiAuth";
import { uiContactControllers } from "./uiContact";
import { uiHomeControllers } from "./uiHome";
import { uiMongoArticlesControllers } from "./uiMongoArticles";
import { uiPostgresArticlesControllers } from "./uiPostgresArticles";

const handleError = [
  (request: Request, response: Response, next: NextFunction) => {
    return next(new HttpError(404, "Not Found"));
  },
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    const httpError = http.handleError(error);
    response.status(httpError.statusCode).render(
      "pages/errors",
      request.t("pages.errors.index", {
        context: httpError.statusCode,
        returnObjects: true,
      }),
    );
  },
];

function handleLayout(request: Request, response: Response, next: NextFunction) {
  response.locals.page = {
    current: {},
    lang: request.i18n.resolvedLanguage,
    url: `https://www.${env.app.domain}${request.originalUrl}`,
  };
  response.locals.user = request.user;
  response.locals.view = request.t("view", {
    returnObjects: true,
  });
  return next();
}

export const uiControllers = {
  handleError,
  handleLayout,
  auth: uiAuthControllers,
  contact: uiContactControllers,
  home: uiHomeControllers,
  mongoArticles: uiMongoArticlesControllers,
  postgresArticles: uiPostgresArticlesControllers,
};
