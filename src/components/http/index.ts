import { ConflictError, UnknownEntityError } from "../databases";
import { logger } from "../logger";
import { ValidationError } from "../validator";
import { HttpError } from "./HttpError";

function handleError(error: unknown) {
  const httpError = (() => {
    if (error instanceof HttpError) {
      return error;
    }

    if (error instanceof ValidationError) {
      return new HttpError(400, "Bad Request", error.errors);
    }

    if (error instanceof UnknownEntityError) {
      return new HttpError(404, "Not Found");
    }

    if (error instanceof ConflictError) {
      return new HttpError(409, "Conflict");
    }

    return new HttpError(500, "Internal Server Error");
  })();

  if (httpError.status === "error") {
    logger.error(error);
  } else {
    logger.warn(error);
  }

  return httpError;
}

export { HttpError } from "./HttpError";

export const http = {
  handleError,
};
