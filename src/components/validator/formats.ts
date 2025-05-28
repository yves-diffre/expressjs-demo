import type { Ajv } from "ajv";
import ajvFormats from "ajv-formats";

export function addFormats(ajv: Ajv) {
  ajvFormats(ajv);
}
