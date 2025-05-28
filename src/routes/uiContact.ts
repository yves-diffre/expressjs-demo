import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.ui.contact;

export const uiContactRoutes = Router();
uiContactRoutes.get("/", controller.displayContact);
uiContactRoutes.post("/", controller.sendContactRequest);
