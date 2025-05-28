import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.api.contact;

export const apiContactRoutes = Router();
apiContactRoutes.post("/", controller.sendContactRequest);
