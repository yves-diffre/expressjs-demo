export async function uiFlow(page, context, events, test) {
  await test.step("should handle error", async () => {
    await page.goto("/404");
  });
}
