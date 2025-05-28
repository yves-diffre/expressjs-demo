import { ContactRequest } from "./ContactRequest";

export type SendContactRequestDto = Pick<ContactRequest, "email" | "name" | "subject" | "text">;

export const SendContactRequestDto = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      ...ContactRequest.properties.email,
      errorMessage: "schemas.SendContactRequestDto.errorMessage.email",
    },
    name: {
      ...ContactRequest.properties.name,
      errorMessage: "schemas.SendContactRequestDto.errorMessage.name",
    },
    subject: {
      ...ContactRequest.properties.subject,
      errorMessage: "schemas.SendContactRequestDto.errorMessage.subject",
    },
    text: {
      ...ContactRequest.properties.text,
      errorMessage: "schemas.SendContactRequestDto.errorMessage.text",
    },
  },
  required: ["email", "name", "subject", "text"],
  errorMessage: {
    _: "schemas.SendContactRequestDto.errorMessage._",
    required: {
      email: "schemas.SendContactRequestDto.errorMessage.email",
      name: "schemas.SendContactRequestDto.errorMessage.name",
      subject: "schemas.SendContactRequestDto.errorMessage.subject",
      text: "schemas.SendContactRequestDto.errorMessage.text",
    },
  },
};
