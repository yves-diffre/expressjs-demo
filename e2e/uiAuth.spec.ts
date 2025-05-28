import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("uiAuth", async ({ browserName, page }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should display sign up", async () => {
    await page.goto("/");
    await page
      .getByRole("link", {
        name: "Sign up",
      })
      .click();
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should sign up", async () => {
    await page.getByLabel("Email").fill(`${browserName}-${context.vars.$uuid}@example.org`);
    await page.getByLabel("Password").fill("password");
    await page
      .getByRole("button", {
        name: "Sign up",
      })
      .click();
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
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
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should sign in", async () => {
    await page.getByLabel("Email").fill(`${browserName}-${context.vars.$uuid}@example.org`);
    await page.getByLabel("Password").fill("password");
    await page
      .getByRole("button", {
        name: "Sign in",
      })
      .click();
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should sign out", async () => {
    await page
      .getByRole("button", {
        name: "Sign out",
      })
      .click();
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
