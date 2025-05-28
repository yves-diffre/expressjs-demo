export async function uiAuthFlow(page, context, events, test) {
  await test.step("should display sign up", async () => {
    await page.goto("/");
    await page
      .getByRole("link", {
        name: "Sign up",
      })
      .click();
  });

  await test.step("should sign up", async () => {
    await page.getByLabel("Email").fill(`${context.vars.$uuid}@example.org`);
    await page.getByLabel("Password").fill("password");
    await page
      .getByRole("button", {
        name: "Sign up",
      })
      .click();
    await page
      .getByRole("button", {
        name: "Sign out",
      })
      .click();
  });

  await test.step("should display sign in", async () => {
    await page
      .getByRole("link", {
        name: "Sign in",
      })
      .click();
  });

  await test.step("should sign in", async () => {
    await page.getByLabel("Email").fill(`${context.vars.$uuid}@example.org`);
    await page.getByLabel("Password").fill("password");
    await page
      .getByRole("button", {
        name: "Sign in",
      })
      .click();
  });

  await test.step("should sign out", async () => {
    await page
      .getByRole("button", {
        name: "Sign out",
      })
      .click();
  });
}
