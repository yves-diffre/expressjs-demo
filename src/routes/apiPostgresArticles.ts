import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.api.postgresArticles;

export const apiPostgresArticlesRoutes = Router();
apiPostgresArticlesRoutes.get("/", controller.getArticles);
apiPostgresArticlesRoutes.post("/", controller.addArticle);
apiPostgresArticlesRoutes.get("/:_id", controller.getArticle);
apiPostgresArticlesRoutes.put("/:_id", controller.editArticle);
apiPostgresArticlesRoutes.delete("/:_id", controller.removeArticle);
