import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("api", async ({ browserName, request }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should handle error", async () => {
    const handleErrorResponse = await request.get("/api/404");
    expect.soft(handleErrorResponse.status()).toBe(404);
    expect.soft(await handleErrorResponse.text()).toMatchSnapshot();
  });
});
