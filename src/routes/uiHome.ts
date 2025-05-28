import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.ui.home;

export const uiHomeRoutes = Router();
uiHomeRoutes.get("/", controller.displayHome);
