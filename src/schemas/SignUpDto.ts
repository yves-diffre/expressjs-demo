import { Credentials } from "./Credentials";

export type SignUpDto = Pick<Credentials, "email" | "password">;

export const SignUpDto = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      ...Credentials.properties.email,
      errorMessage: "schemas.SignUpDto.errorMessage.email",
    },
    password: {
      ...Credentials.properties.password,
      errorMessage: "schemas.SignUpDto.errorMessage.password",
    },
  },
  required: ["email", "password"],
  errorMessage: {
    _: "schemas.SignUpDto.errorMessage._",
    required: {
      email: "schemas.SignUpDto.errorMessage.email",
      password: "schemas.SignUpDto.errorMessage.password",
    },
  },
};
