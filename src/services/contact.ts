import { env } from "../components/env";
import { mailer } from "../components/mailer";
import { ValidationError, validator } from "../components/validator";
import { SendContactRequestDto } from "../schemas";

const validateSendContactRequestDto = validator.compile(SendContactRequestDto);
async function sendContactRequest(dto: SendContactRequestDto) {
  const valid = validateSendContactRequestDto(dto);
  if (!valid) {
    throw new ValidationError(validateSendContactRequestDto.errors);
  }

  return mailer.sendMail({
    from: `${dto.name} <${dto.email}>`,
    subject: `Contact request - ${dto.subject}`,
    text: dto.text,
    to: env.app.mail,
  });
}

export const contactServices = {
  sendContactRequest,
};
