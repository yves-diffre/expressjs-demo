import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.ui.postgresArticles;

export const uiPostgresArticlesRoutes = Router();
uiPostgresArticlesRoutes.get("/", controller.displayArticles);
uiPostgresArticlesRoutes.get("/add-article", controller.displayAddArticle);
uiPostgresArticlesRoutes.post("/add-article", controller.addArticle);
uiPostgresArticlesRoutes.get("/:_id", controller.displayArticle);
uiPostgresArticlesRoutes.get("/:_id/edit-article", controller.displayEditArticle);
uiPostgresArticlesRoutes.post("/:_id/edit-article", controller.editArticle);
uiPostgresArticlesRoutes.post("/:_id/remove-article", controller.removeArticle);
