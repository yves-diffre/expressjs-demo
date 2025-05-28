import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("uiHome", async ({ browserName, page }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should display home", async () => {
    await page.goto("/");
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
