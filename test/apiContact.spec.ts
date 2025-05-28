import {
  dto,
  evaluateMailerSendMailSpy,
  sendContactRequest,
  services,
  spies,
} from "./apiContact.helpers";

afterEach(() => {
  spies.mailer.sendMail.mockClear();
});

test("should not send a contact request when data are missing", async () => {
  const sendContactRequestResponse = await sendContactRequest(undefined);
  expect(sendContactRequestResponse.status).toBe(400);
  expect(sendContactRequestResponse.body).toMatchSnapshot();
  expect(spies.mailer.sendMail).not.toHaveBeenCalled();
});

test("should not send a contact request when validation failed", async () => {
  const sendContactRequestResponse = await sendContactRequest({
    email: "",
    name: "",
    subject: "",
    text: "",
  });
  expect(sendContactRequestResponse.status).toBe(400);
  expect(sendContactRequestResponse.body).toMatchSnapshot();
  expect(spies.mailer.sendMail).not.toHaveBeenCalled();
});

test("should not send a contact request when an unexpected error occurred", async () => {
  jest.spyOn(services.contact, "sendContactRequest").mockImplementationOnce(() => {
    throw new Error();
  });
  const sendContactRequestResponse = await sendContactRequest(dto.sendContactRequest);
  expect(sendContactRequestResponse.status).toBe(500);
  expect(sendContactRequestResponse.body).toMatchSnapshot();
});

test("should send a contact request", async () => {
  const sendContactRequestResponse = await sendContactRequest(dto.sendContactRequest);
  expect(sendContactRequestResponse.status).toBe(204);
  expect(sendContactRequestResponse.body).toMatchSnapshot();
  expect(evaluateMailerSendMailSpy()).toMatchSnapshot();
});
