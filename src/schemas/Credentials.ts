export type Credentials = {
  email: string;
  password: string;
};

export const Credentials = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      maxLength: 100,
      minLength: 1,
      transform: ["trim"],
    },
  },
  required: ["email", "password"],
};
