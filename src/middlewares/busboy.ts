import type { Express } from "express";
import busboy from "express-busboy";

export function addBusboyMiddleware(app: Express) {
  busboy.extend(app, {
    mimeTypeLimit: ["image/jpeg"],
    upload: true,
  });
}
