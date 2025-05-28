import { Ajv } from "ajv";
import { addErrors } from "./errors";
import { addFormats } from "./formats";
import { addKeywords } from "./keywords";

export { ValidationError } from "./ValidationError";

export const validator = new Ajv({
  allErrors: true,
  coerceTypes: true,
});
addErrors(validator);
addFormats(validator);
addKeywords(validator);
