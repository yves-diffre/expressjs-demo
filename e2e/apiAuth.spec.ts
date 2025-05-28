import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("apiAuth", async ({ browserName, request }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should sign up", async () => {
    const signUpResponse = await request.post("/api/auth/sign-up", {
      data: {
        email: `${browserName}-${context.vars.$uuid}@example.org`,
        password: "password",
      },
    });
    expect.soft(signUpResponse.status()).toBe(204);
    expect.soft(await signUpResponse.text()).toMatchSnapshot();
  });

  await test.step("should sign in", async () => {
    const signInResponse = await request.post("/api/auth/sign-in", {
      data: {
        email: `${browserName}-${context.vars.$uuid}@example.org`,
        password: "password",
      },
    });
    expect.soft(signInResponse.status()).toBe(204);
    expect.soft(await signInResponse.text()).toMatchSnapshot();
  });

  await test.step("should sign out", async () => {
    const signOutResponse = await request.post("/api/auth/sign-out");
    expect.soft(signOutResponse.status()).toBe(204);
    expect.soft(await signOutResponse.text()).toMatchSnapshot();
  });
});
