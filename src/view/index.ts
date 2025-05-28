import type { Express } from "express";
import { engine } from "express-handlebars";
import { helpers } from "./helpers";

export function addView(app: Express) {
  const extension = "hbs";
  app
    .engine(
      extension,
      engine({
        defaultLayout: false,
        extname: `.${extension}`,
        helpers,
      }),
    )
    .set("view engine", extension);
}
