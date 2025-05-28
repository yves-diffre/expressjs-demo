import {
  displayContact,
  dto,
  evaluateMailerSendMailSpy,
  evaluatePage,
  sendContactRequest,
  services,
  spies,
} from "./uiContact.helpers";

afterEach(() => {
  spies.mailer.sendMail.mockClear();
});

test("should display contact", async () => {
  const displayContactResponse = await displayContact();
  expect(displayContactResponse.status).toBe(200);
  expect(evaluatePage(displayContactResponse.text)).toMatchSnapshot();
});

test("should not send a contact request when data are missing", async () => {
  const sendContactRequestResponse = await sendContactRequest(undefined);
  expect(sendContactRequestResponse.status).toBe(200);
  expect(evaluatePage(sendContactRequestResponse.text)).toMatchSnapshot();
  expect(spies.mailer.sendMail).not.toHaveBeenCalled();
});

test("should not send a contact request when validation failed", async () => {
  const sendContactRequestResponse = await sendContactRequest({
    email: "",
    name: "",
    subject: "",
    text: "",
  });
  expect(sendContactRequestResponse.status).toBe(200);
  expect(evaluatePage(sendContactRequestResponse.text)).toMatchSnapshot();
  expect(spies.mailer.sendMail).not.toHaveBeenCalled();
});

test("should not send a contact request when an unexpected error occurred", async () => {
  jest.spyOn(services.contact, "sendContactRequest").mockImplementationOnce(() => {
    throw new Error();
  });
  const sendContactRequestResponse = await sendContactRequest(dto.sendContactRequest);
  expect(sendContactRequestResponse.status).toBe(200);
  expect(evaluatePage(sendContactRequestResponse.text)).toMatchSnapshot();
});

test("should send a contact request", async () => {
  const sendContactRequestResponse = await sendContactRequest(dto.sendContactRequest);
  expect(sendContactRequestResponse.status).toBe(200);
  expect(evaluatePage(sendContactRequestResponse.text)).toMatchSnapshot();
  expect(evaluateMailerSendMailSpy()).toMatchSnapshot();
});
