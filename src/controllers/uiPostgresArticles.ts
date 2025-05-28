import type { NextFunction, Request, Response } from "express";
import { http } from "../components/http";
import type { Article } from "../schemas";
import { services } from "../services";

async function displayArticles(request: Request, response: Response, next: NextFunction) {
  response.locals.page.current.postgresArticles = true;

  const articles = await services.postgresArticles.getArticles();
  response.status(200).render("pages/articles", {
    ...request.t("pages.articles.index", {
      baseUrl: request.baseUrl,
      returnObjects: true,
    }),
    articles,
    previews: articles.map((article) => {
      return {
        ...request.t("pages.articles.shared.preview", {
          article,
          baseUrl: request.baseUrl,
          returnObjects: true,
        }),
        article,
      };
    }),
  });
}

async function displayAddArticle(request: Request, response: Response, next: NextFunction) {
  response.locals.page.current.postgresArticles = true;

  const flash = response.locals.flash ?? {};
  response.status(200).render("pages/articles/addArticle", {
    ...request.t("pages.articles.addArticle", {
      baseUrl: request.baseUrl,
      returnObjects: true,
    }),
    dto: flash.dto,
    errors: flash.errors,
  });
}

async function addArticle(request: Request, response: Response, next: NextFunction) {
  const dto = {
    ...request.body,
    ...request.files,
  };

  try {
    const result = await services.postgresArticles.addArticle(dto);
    response.flash({
      message: request.t("controllers.articles.addArticle.message", {
        context: 200,
        result,
      }),
      status: "success",
    });
    return response.redirect(303, `${request.baseUrl}/${result._id}/edit-article`);
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      dto,
      errors: httpError.errors,
      message: request.t("controllers.articles.addArticle.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(303, request.originalUrl);
  }
}

async function displayArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  response.locals.page.current.postgresArticles = true;

  const article = await services.postgresArticles.getArticle(request.params._id);
  response.status(200).render("pages/articles/article", {
    ...request.t("pages.articles.article", {
      article,
      baseUrl: request.baseUrl,
      returnObjects: true,
    }),
    article,
  });
}

async function displayEditArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  response.locals.page.current.postgresArticles = true;

  const article = await services.postgresArticles.getArticle(request.params._id);
  const flash = response.locals.flash ?? {};
  response.status(200).render("pages/articles/editArticle", {
    ...request.t("pages.articles.editArticle", {
      article,
      baseUrl: request.baseUrl,
      returnObjects: true,
    }),
    article,
    dto: {
      ...article,
      ...flash.dto,
    },
    errors: flash.errors,
  });
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

  try {
    const result = await services.postgresArticles.editArticle(request.params._id, dto);
    response.flash({
      message: request.t("controllers.articles.editArticle.message", {
        context: 200,
        result,
      }),
      status: "success",
    });
    return response.redirect(303, request.originalUrl);
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      dto,
      errors: httpError.errors,
      message: request.t("controllers.articles.editArticle.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(
      303,
      httpError.statusCode === 404 ? request.baseUrl : request.originalUrl,
    );
  }
}

async function removeArticle(
  request: Request<{
    _id: Article["_id"];
  }>,
  response: Response,
  next: NextFunction,
) {
  try {
    const result = await services.postgresArticles.removeArticle(request.params._id);
    response.flash({
      message: request.t("controllers.articles.removeArticle.message", {
        context: 200,
        result,
      }),
      status: "success",
    });
    return response.redirect(303, request.baseUrl);
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      errors: httpError.errors,
      message: request.t("controllers.articles.removeArticle.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(
      303,
      httpError.statusCode === 404
        ? request.baseUrl
        : (request.get("Referrer") ?? request.baseUrl),
    );
  }
}

export const uiPostgresArticlesControllers = {
  displayArticles,
  displayAddArticle,
  addArticle,
  displayArticle,
  displayEditArticle,
  editArticle,
  removeArticle,
};
