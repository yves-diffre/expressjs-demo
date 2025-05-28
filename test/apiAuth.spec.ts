import { dto, services, signIn, signOut, signUp } from "./apiAuth.helpers";

test("should not sign up when data are missing", async () => {
  const signUpResponse = await signUp(undefined);
  expect(signUpResponse.status).toBe(400);
  expect(signUpResponse.body).toMatchSnapshot();
});

test("should not sign up when validation failed", async () => {
  const signUpResponse = await signUp({
    email: "",
    password: "",
  });
  expect(signUpResponse.status).toBe(400);
  expect(signUpResponse.body).toMatchSnapshot();
});

test("should not sign up when an unexpected error occurred", async () => {
  jest.spyOn(services.auth, "signUp").mockImplementationOnce(() => {
    throw new Error();
  });
  const signUpResponse = await signUp(dto.signUp);
  expect(signUpResponse.status).toBe(500);
  expect(signUpResponse.body).toMatchSnapshot();
});

test("should sign up", async () => {
  const signUpResponse = await signUp(dto.signUp);
  expect(signUpResponse.status).toBe(204);
  expect(signUpResponse.body).toMatchSnapshot();
  await signOut();
});

test("should not sign up when user already exists", async () => {
  const signUpResponse = await signUp(dto.signUp);
  expect(signUpResponse.status).toBe(409);
  expect(signUpResponse.body).toMatchSnapshot();
});

test("should not sign in when data are missing", async () => {
  const signInResponse = await signIn(undefined);
  expect(signInResponse.status).toBe(400);
  expect(signInResponse.body).toMatchSnapshot();
});

test("should not sign in when validation failed", async () => {
  const signInResponse = await signIn({
    email: "",
    password: "",
  });
  expect(signInResponse.status).toBe(400);
  expect(signInResponse.body).toMatchSnapshot();
});

test("should not sign in when user is not found", async () => {
  const signInResponse = await signIn({
    ...dto.signIn,
    email: "unknown@example.org",
  });
  expect(signInResponse.status).toBe(404);
  expect(signInResponse.body).toMatchSnapshot();
});

test("should not sign in when password is wrong", async () => {
  const signInResponse = await signIn({
    ...dto.signIn,
    password: "wrong",
  });
  expect(signInResponse.status).toBe(404);
  expect(signInResponse.body).toMatchSnapshot();
});

test("should not sign in when an unexpected error occurred", async () => {
  jest.spyOn(services.auth, "signIn").mockImplementationOnce(() => {
    throw new Error();
  });
  const signInResponse = await signIn(dto.signIn);
  expect(signInResponse.status).toBe(500);
  expect(signInResponse.body).toMatchSnapshot();
});

test("should sign in", async () => {
  const signInResponse = await signIn(dto.signIn);
  expect(signInResponse.status).toBe(204);
  expect(signInResponse.body).toMatchSnapshot();
});

test("should not sign out when an unexpected error occurred", async () => {
  jest.spyOn(services.auth, "signOut").mockImplementationOnce(() => {
    throw new Error();
  });
  const signOutResponse = await signOut();
  expect(signOutResponse.status).toBe(500);
  expect(signOutResponse.body).toMatchSnapshot();
});

test("should sign out", async () => {
  const signOutResponse = await signOut();
  expect(signOutResponse.status).toBe(204);
  expect(signOutResponse.body).toMatchSnapshot();
});
