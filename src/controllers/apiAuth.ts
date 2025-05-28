import type { NextFunction, Request, Response } from "express";
import { services } from "../services";

async function signUp(request: Request, response: Response, next: NextFunction) {
  const dto = request.body;
  await services.auth.signUp(dto, request);
  response.status(204).json();
}

async function signIn(request: Request, response: Response, next: NextFunction) {
  const dto = request.body;
  await services.auth.signIn(dto, request);
  response.status(204).json();
}

async function signOut(request: Request, response: Response, next: NextFunction) {
  await services.auth.signOut(request);
  response.status(204).json();
}

export const apiAuthControllers = {
  signUp,
  signIn,
  signOut,
};
