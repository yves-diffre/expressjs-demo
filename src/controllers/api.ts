import type { NextFunction, Request, Response } from "express";
import { http, HttpError } from "../components/http";
import { apiAuthControllers } from "./apiAuth";
import { apiContactControllers } from "./apiContact";
import { apiMongoArticlesControllers } from "./apiMongoArticles";
import { apiPostgresArticlesControllers } from "./apiPostgresArticles";

const handleError = [
  (request: Request, response: Response, next: NextFunction) => {
    return next(new HttpError(404, "Not Found"));
  },
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    const httpError = http.handleError(error);
    response.status(httpError.statusCode).json({
      errors: httpError.errors,
      message: httpError.message,
      status: httpError.status,
      statusCode: httpError.statusCode,
    });
  },
];

export const apiControllers = {
  handleError,
  auth: apiAuthControllers,
  contact: apiContactControllers,
  mongoArticles: apiMongoArticlesControllers,
  postgresArticles: apiPostgresArticlesControllers,
};
