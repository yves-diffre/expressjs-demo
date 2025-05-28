import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.api.auth;

export const apiAuthRoutes = Router();
apiAuthRoutes.post("/sign-up", controller.signUp);
apiAuthRoutes.post("/sign-in", controller.signIn);
apiAuthRoutes.post("/sign-out", controller.signOut);
