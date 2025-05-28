import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("uiContact", async ({ browserName, page }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should display contact", async () => {
    await page.goto("/");
    await page
      .getByRole("link", {
        name: "Contact",
      })
      .click();
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should send a contact request", async () => {
    await page.getByLabel("Email").fill(`${browserName}@example.org`);
    await page.getByLabel("Name").fill(`name (${browserName})`);
    await page.getByLabel("Subject").fill("subject");
    await page.getByLabel("Text").fill("text");
    await page
      .getByRole("button", {
        name: "Send",
      })
      .click();
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
