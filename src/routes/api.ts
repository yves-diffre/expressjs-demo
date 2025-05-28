import { Router } from "express";
import { controllers } from "../controllers";
import { apiAuthRoutes } from "./apiAuth";
import { apiContactRoutes } from "./apiContact";
import { apiMongoArticlesRoutes } from "./apiMongoArticles";
import { apiPostgresArticlesRoutes } from "./apiPostgresArticles";

const controller = controllers.api;

export const apiRoutes = Router();
apiRoutes.use("/auth", apiAuthRoutes);
apiRoutes.use("/contact", apiContactRoutes);
apiRoutes.use("/mongo-articles", apiMongoArticlesRoutes);
apiRoutes.use("/postgres-articles", apiPostgresArticlesRoutes);
apiRoutes.use(controller.handleError);
