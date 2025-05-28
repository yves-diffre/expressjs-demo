export type ContactRequest = {
  email: string;
  name: string;
  subject: string;
  text: string;
};

export const ContactRequest = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    name: {
      type: "string",
      maxLength: 100,
      minLength: 1,
      transform: ["trim"],
    },
    subject: {
      type: "string",
      maxLength: 100,
      minLength: 1,
      transform: ["trim"],
    },
    text: {
      type: "string",
      minLength: 1,
      transform: ["trim"],
    },
  },
  required: ["email", "name", "subject", "text"],
};
