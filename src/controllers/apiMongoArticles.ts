import type { NextFunction, Request, Response } from "express";
import type { Article } from "../schemas";
import { services } from "../services";

async function getArticles(request: Request, response: Response, next: NextFunction) {
  const articles = await services.mongoArticles.getArticles();
  response.status(200).json(articles);
}

async function addArticle(request: Request, response: Response, next: NextFunction) {
  const dto = {
    ...request.body,
    ...request.files,
  };
  const result = await services.mongoArticles.addArticle(dto);
  response.status(201).location(`${request.baseUrl}/${result._id}`).json();
}

async function getArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  const article = await services.mongoArticles.getArticle(request.params._id);
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
  await services.mongoArticles.editArticle(request.params._id, dto);
  response.status(204).json();
}

async function removeArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  await services.mongoArticles.removeArticle(request.params._id);
  response.status(204).json();
}

export const apiMongoArticlesControllers = {
  getArticles,
  addArticle,
  getArticle,
  editArticle,
  removeArticle,
};
