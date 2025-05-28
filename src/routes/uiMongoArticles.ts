import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.ui.mongoArticles;

export const uiMongoArticlesRoutes = Router();
uiMongoArticlesRoutes.get("/", controller.displayArticles);
uiMongoArticlesRoutes.get("/add-article", controller.displayAddArticle);
uiMongoArticlesRoutes.post("/add-article", controller.addArticle);
uiMongoArticlesRoutes.get("/:_id", controller.displayArticle);
uiMongoArticlesRoutes.get("/:_id/edit-article", controller.displayEditArticle);
uiMongoArticlesRoutes.post("/:_id/edit-article", controller.editArticle);
uiMongoArticlesRoutes.post("/:_id/remove-article", controller.removeArticle);
