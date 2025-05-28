import { Credentials } from "./Credentials";

export type SignInDto = Pick<Credentials, "email" | "password">;

export const SignInDto = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      ...Credentials.properties.email,
      errorMessage: "schemas.SignInDto.errorMessage.email",
    },
    password: {
      ...Credentials.properties.password,
      errorMessage: "schemas.SignInDto.errorMessage.password",
    },
  },
  required: ["email", "password"],
  errorMessage: {
    _: "schemas.SignInDto.errorMessage._",
    required: {
      email: "schemas.SignInDto.errorMessage.email",
      password: "schemas.SignInDto.errorMessage.password",
    },
  },
};
