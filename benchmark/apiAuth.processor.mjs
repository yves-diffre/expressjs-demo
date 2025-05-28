export function signUp(request, context, events, next) {
  const dto = {
    email: `${context.vars.$uuid}@example.org`,
    password: "password",
  };
  request.json = dto;
  return next();
}

export function signIn(request, context, events, next) {
  const dto = {
    email: `${context.vars.$uuid}@example.org`,
    password: "password",
  };
  request.json = dto;
  return next();
}
