import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
  ],
  reporter: [
    [
      "html",
      {
        open: "never",
      },
    ],
  ],
  retries: process.env.CI ? 2 : 0,
  snapshotDir: "./e2e/__snapshots__",
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  use: {
    baseURL: "https://www.expressjs-demo.localhost",
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
  },
  workers: process.env.CI ? 1 : undefined,
});
