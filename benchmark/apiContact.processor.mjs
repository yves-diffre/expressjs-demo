export function sendContactRequest(request, context, events, next) {
  const dto = {
    email: `${context.vars.$uuid}@example.org`,
    name: `name (${context.vars.$uuid})`,
    subject: "subject",
    text: "text",
  };
  request.json = dto;
  return next();
}
