export class HttpError extends Error {
  readonly errors?: Record<string, string>;
  readonly status: "error" | "fail";
  readonly statusCode: number;

  constructor(statusCode: number, message: string, errors?: Record<string, string>) {
    super(message);
    this.errors = errors;
    this.status = statusCode >= 500 ? "error" : "fail";
    this.statusCode = statusCode;
  }
}
