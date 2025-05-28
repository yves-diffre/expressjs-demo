import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("ui", async ({ browserName, page }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should handle error", async () => {
    await page.goto("/404");
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
