import type { NextFunction, Request, Response } from "express";

function displayHome(request: Request, response: Response, next: NextFunction) {
  response.locals.page.current.home = true;

  response.status(200).render(
    "pages/home",
    request.t("pages.home.index", {
      returnObjects: true,
    }),
  );
}

export const uiHomeControllers = {
  displayHome,
};
