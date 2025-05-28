export async function uiContactFlow(page, context, events, test) {
  await test.step("should display contact", async () => {
    await page.goto("/");
    await page
      .getByRole("link", {
        name: "Contact",
      })
      .click();
  });

  await test.step("should send a contact request", async () => {
    await page.getByLabel("Email").fill(`${context.vars.$uuid}@example.org`);
    await page.getByLabel("Name").fill(`name (${context.vars.$uuid})`);
    await page.getByLabel("Subject").fill("subject");
    await page.getByLabel("Text").fill("text");
    await page
      .getByRole("button", {
        name: "Send",
      })
      .click();
  });
}
