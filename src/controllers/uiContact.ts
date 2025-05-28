import type { NextFunction, Request, Response } from "express";
import { http } from "../components/http";
import { services } from "../services";

async function displayContact(request: Request, response: Response, next: NextFunction) {
  response.locals.page.current.contact = true;

  const flash = response.locals.flash ?? {};
  response.status(200).render("pages/contact", {
    ...request.t("pages.contact.index", {
      returnObjects: true,
    }),
    dto: flash.dto,
    errors: flash.errors,
  });
}

async function sendContactRequest(request: Request, response: Response, next: NextFunction) {
  const dto = request.body;

  try {
    await services.contact.sendContactRequest(dto);
    response.flash({
      message: request.t("controllers.contact.sendContactRequest.message", {
        context: 200,
      }),
      status: "success",
    });
    return response.redirect(303, request.originalUrl);
  } catch (error) {
    const httpError = http.handleError(error);
    response.flash({
      dto,
      errors: httpError.errors,
      message: request.t("controllers.contact.sendContactRequest.message", {
        context: httpError.statusCode,
      }),
      status: httpError.status,
    });
    return response.redirect(303, request.originalUrl);
  }
}

export const uiContactControllers = {
  displayContact,
  sendContactRequest,
};
