import express from "express";
import { addMiddlewares } from "./middlewares";
import { addView } from "./view";

export const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);
addMiddlewares(app);
addView(app);
