import { Router } from "express";
import { apiRoutes } from "./api";
import { uiRoutes } from "./ui";

export const routes = Router();
routes.use("/api", apiRoutes);
routes.use("/", uiRoutes);
