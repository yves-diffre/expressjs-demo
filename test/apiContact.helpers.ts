import { agent } from "supertest";
import { app } from "../src/app";
import { mailer } from "../src/components/mailer";
import type { SendContactRequestDto } from "../src/schemas";

export { services } from "../src/services";

export const dto = {
  sendContactRequest: {
    email: "email@example.org",
    name: "name",
    subject: "subject",
    text: "text",
  },
};

export const spies = {
  mailer: {
    sendMail: jest
      .spyOn(mailer, "sendMail")
      .mockResolvedValue({} as ReturnType<typeof mailer.sendMail>),
  },
};

export async function sendContactRequest(dto?: Partial<SendContactRequestDto>) {
  return agent(app).post("/api/contact").send(dto);
}

export function evaluateMailerSendMailSpy() {
  return spies.mailer.sendMail.mock.calls[0];
}
