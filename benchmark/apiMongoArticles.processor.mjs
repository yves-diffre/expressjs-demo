import fs from "node:fs";
import FormData from "form-data";

export function addArticle(request, context, events, next) {
  const dto = new FormData();
  dto.append("description", "description");
  dto.append("image", fs.createReadStream("benchmark/assets/articles/image.jpg"));
  dto.append("name", `name (${context.vars.$uuid})`);
  dto.append("text", "text");
  request.body = dto;
  return next();
}

export function getInsertedId(request, response, context, events, next) {
  context.vars._id = String(response.headers.location?.match(/([^/]+)/g)?.[2]);
  return next();
}

export function editArticle(request, context, events, next) {
  const dto = new FormData();
  dto.append("description", "new description");
  dto.append("image", fs.createReadStream("benchmark/assets/articles/new-image.jpg"));
  dto.append("name", `new name (${context.vars.$uuid})`);
  dto.append("text", "new text");
  request.body = dto;
  return next();
}
