import type { Ajv } from "ajv";
import ajvErrors from "ajv-errors";

export function addErrors(ajv: Ajv) {
  ajvErrors(ajv);
}
