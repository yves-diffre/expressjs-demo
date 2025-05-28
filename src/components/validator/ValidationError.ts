import type { ErrorObject } from "ajv";
import { i18n } from "../i18n";

export class ValidationError extends Error {
  readonly errors?: Record<string, string>;

  constructor(errors?: ErrorObject[] | null) {
    super("Validation Error");
    this.errors = errors?.reduce(
      (accumulator, error) => {
        const path = error.instancePath
          ? error.instancePath.substring(1).replace(/\//g, ".")
          : error.params.errors[0].params.missingProperty;
        accumulator[path] = i18n.t(String(error.message));
        return accumulator;
      },
      {} as NonNullable<typeof this.errors>,
    );
  }
}
