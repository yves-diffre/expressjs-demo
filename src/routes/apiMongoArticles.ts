import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.api.mongoArticles;

export const apiMongoArticlesRoutes = Router();
apiMongoArticlesRoutes.get("/", controller.getArticles);
apiMongoArticlesRoutes.post("/", controller.addArticle);
apiMongoArticlesRoutes.get("/:_id", controller.getArticle);
apiMongoArticlesRoutes.put("/:_id", controller.editArticle);
apiMongoArticlesRoutes.delete("/:_id", controller.removeArticle);
