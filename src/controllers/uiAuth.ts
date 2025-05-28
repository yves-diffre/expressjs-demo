import type { NextFunction, Request, Response } from "express";
import { http } from "../components/http";
import { services } from "../services";

async function displaySignUp(request: Request, response: Response, next: NextFunction) {
  response.locals.page.current.signUp = true;

  const flash = response.locals.flash ?? {};
  response.status(200).render("pages/auth/signUp", {
    ...request.t("pages.auth.signUp", {
      returnObjects: true,
    }),
    dto: flash.dto,
    errors: flash.errors,
  });
}

async function signUp(request: Request, response: Response, next: NextFunction) {
  const dto = request.body;

  try {
    await services.auth.signUp(dto, request);
    response.flash({
      message: request.t("controllers.auth.signUp.message", {
        context: 200,
      }),
      status: "success",
    });
    return response.redirect(303, "/");
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      dto,
      errors: httpError.errors,
      message: request.t("controllers.auth.signUp.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(303, request.originalUrl);
  }
}

async function displaySignIn(request: Request, response: Response, next: NextFunction) {
  response.locals.page.current.signIn = true;

  const flash = response.locals.flash ?? {};
  response.status(200).render("pages/auth/signIn", {
    ...request.t("pages.auth.signIn", {
      returnObjects: true,
    }),
    dto: flash.dto,
    errors: flash.errors,
  });
}

async function signIn(request: Request, response: Response, next: NextFunction) {
  const dto = request.body;

  try {
    await services.auth.signIn(dto, request);
    response.flash({
      message: request.t("controllers.auth.signIn.message", {
        context: 200,
      }),
      status: "success",
    });
    return response.redirect(303, "/");
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      dto,
      errors: httpError.errors,
      message: request.t("controllers.auth.signIn.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(303, request.originalUrl);
  }
}

async function signOut(request: Request, response: Response, next: NextFunction) {
  try {
    await services.auth.signOut(request);
    response.flash({
      message: request.t("controllers.auth.signOut.message", {
        context: 200,
      }),
      status: "success",
    });
    return response.redirect(303, "/");
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      errors: httpError.errors,
      message: request.t("controllers.auth.signOut.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(303, request.get("Referrer") ?? "/");
  }
}

export const uiAuthControllers = {
  displaySignUp,
  signUp,
  displaySignIn,
  signIn,
  signOut,
};
