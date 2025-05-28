import crypto from "node:crypto";
import { expect, test } from "@playwright/test";
import type { Article } from "../src/schemas";

test("uiPostgresArticles", async ({ browserName, page }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  let _id: Article["_id"];

  await test.step("should display articles", async () => {
    await page.goto("/");
    await page
      .getByRole("link", {
        name: "Postgres articles",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should add an article", async () => {
    await page
      .getByRole("button", {
        name: "Add",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });

    await page.getByLabel("Description").fill("description");
    await page.getByLabel("Image").setInputFiles("e2e/assets/articles/image.jpg");
    await page.getByLabel("Name").fill(`name (${browserName})`);
    await page.getByLabel("Text").fill("text");
    await page
      .getByRole("button", {
        name: "Add",
      })
      .click();
    _id = String(page.url().match(/([^/]+)/g)?.[3]);
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should display an article", async () => {
    await page
      .getByRole("link", {
        name: "here",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should edit an article", async () => {
    await page
      .getByRole("button", {
        name: "Edit",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });

    await page.getByLabel("Description").fill("new description");
    await page.getByLabel("Image").setInputFiles("e2e/assets/articles/new-image.jpg");
    await page.getByLabel("Name").fill(`new name (${browserName})`);
    await page.getByLabel("Text").fill("new text");
    await page
      .getByRole("button", {
        name: "Edit",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });

  await test.step("should remove an article", async () => {
    await page
      .getByRole("button", {
        name: "Back to articles",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });

    await page
      .locator(`article[data-id='${_id}']`)
      .getByRole("button", {
        name: "Remove",
      })
      .click();
    await page.evaluate(evaluate, _id);
    await expect.soft(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

function evaluate(_id?: Article["_id"]) {
  const data = document.querySelector("main > ul");
  if (data) {
    data.innerHTML = data.innerHTML.replace(/on (.*)/g, "on 1/1/1970");
  }

  const previews = document.querySelector("main > nav");
  if (previews) {
    const preview = previews.querySelector(`article[data-id='${_id}']`);
    previews.innerHTML = preview ? preview.outerHTML : "";
  }
}
