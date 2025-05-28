export async function uiPostgresArticlesFlow(page, context, events, test) {
  let _id;

  await test.step("should display articles", async () => {
    await page.goto("/");
    await page
      .getByRole("link", {
        name: "Postgres articles",
      })
      .click();
  });

  await test.step("should add an article", async () => {
    await page
      .getByRole("button", {
        name: "Add",
      })
      .click();

    await page.getByLabel("Description").fill("description");
    await page.getByLabel("Image").setInputFiles("benchmark/assets/articles/image.jpg");
    await page.getByLabel("Name").fill(`name (${context.vars.$uuid})`);
    await page.getByLabel("Text").fill("text");
    await page
      .getByRole("button", {
        name: "Add",
      })
      .click();
    _id = String(page.url().match(/([^/]+)/g)?.[3]);
  });

  await test.step("should display an article", async () => {
    await page
      .getByRole("link", {
        name: "here",
      })
      .click();
  });

  await test.step("should edit an article", async () => {
    await page
      .getByRole("button", {
        name: "Edit",
      })
      .click();

    await page.getByLabel("Description").fill("new description");
    await page.getByLabel("Image").setInputFiles("benchmark/assets/articles/new-image.jpg");
    await page.getByLabel("Name").fill(`new name (${context.vars.$uuid})`);
    await page.getByLabel("Text").fill("new text");
    await page
      .getByRole("button", {
        name: "Edit",
      })
      .click();
  });

  await test.step("should remove an article", async () => {
    await page
      .getByRole("button", {
        name: "Back to articles",
      })
      .click();

    await page
      .locator(`article[data-id='${_id}']`)
      .getByRole("button", {
        name: "Remove",
      })
      .click();
  });
}
