import type { NextFunction, Request, Response } from "express";
import { services } from "../services";

async function sendContactRequest(request: Request, response: Response, next: NextFunction) {
  const dto = request.body;
  await services.contact.sendContactRequest(dto);
  response.status(204).json();
}

export const apiContactControllers = {
  sendContactRequest,
};
