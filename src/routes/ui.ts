import { Router } from "express";
import { controllers } from "../controllers";
import { uiAuthRoutes } from "./uiAuth";
import { uiContactRoutes } from "./uiContact";
import { uiHomeRoutes } from "./uiHome";
import { uiMongoArticlesRoutes } from "./uiMongoArticles";
import { uiPostgresArticlesRoutes } from "./uiPostgresArticles";

const controller = controllers.ui;

export const uiRoutes = Router();
uiRoutes.use(controller.handleLayout);
uiRoutes.use("/", uiHomeRoutes);
uiRoutes.use("/auth", uiAuthRoutes);
uiRoutes.use("/contact", uiContactRoutes);
uiRoutes.use("/mongo-articles", uiMongoArticlesRoutes);
uiRoutes.use("/postgres-articles", uiPostgresArticlesRoutes);
uiRoutes.use(controller.handleError);
