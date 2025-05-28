export async function uiHomeFlow(page, context, events, test) {
  await test.step("should display home", async () => {
    await page.goto("/");
  });
}
