import { Router } from "express";
import { controllers } from "../controllers";

const controller = controllers.ui.auth;

export const uiAuthRoutes = Router();
uiAuthRoutes.get("/sign-up", controller.displaySignUp);
uiAuthRoutes.post("/sign-up", controller.signUp);
uiAuthRoutes.get("/sign-in", controller.displaySignIn);
uiAuthRoutes.post("/sign-in", controller.signIn);
uiAuthRoutes.post("/sign-out", controller.signOut);
