import crypto from "node:crypto";
import { expect, test } from "@playwright/test";

test("apiContact", async ({ browserName, request }) => {
  const context = {
    vars: {
      $uuid: crypto.randomUUID(),
    },
  };

  await test.step("should send a contact request", async () => {
    const sendContactRequestResponse = await request.post("/api/contact", {
      data: {
        email: `${browserName}@example.org`,
        name: `name (${browserName})`,
        subject: "subject",
        text: "text",
      },
    });
    expect.soft(sendContactRequestResponse.status()).toBe(204);
    expect.soft(await sendContactRequestResponse.text()).toMatchSnapshot();
  });
});
