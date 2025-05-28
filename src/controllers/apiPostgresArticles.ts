import type { NextFunction, Request, Response } from "express";
import type { Article } from "../schemas";
import { services } from "../services";

async function getArticles(request: Request, response: Response, next: NextFunction) {
  const articles = await services.postgresArticles.getArticles();
  response.status(200).json(articles);
}

async function addArticle(request: Request, response: Response, next: NextFunction) {
  const dto = {
    ...request.body,
    ...request.files,
  };
  const result = await services.postgresArticles.addArticle(dto);
  response.status(201).location(`${request.baseUrl}/${result._id}`).json();
}

async function getArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  const article = await services.postgresArticles.getArticle(request.params._id);
  response.status(200).json(article);
}

async function editArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  const dto = {
    ...request.body,
    ...request.files,
  };
  await services.postgresArticles.editArticle(request.params._id, dto);
  response.status(204).json();
}

async function removeArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  await services.postgresArticles.removeArticle(request.params._id);
  response.status(204).json();
}

export const apiPostgresArticlesControllers = {
  getArticles,
  addArticle,
  getArticle,
  editArticle,
  removeArticle,
};
