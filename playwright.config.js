// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120_000,          // 2 min — AI analysis takes ~30s
  expect: { timeout: 15_000 },
  fullyParallel: false,       // tests share state (registered accounts)
  retries: 1,
  workers: 1,                 // sequential — avoids race conditions on auth
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://app.kasemind.fr',
    headless: true,
    viewport: { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Galaxy S9+'], viewport: { width: 375, height: 812 } },
    },
  ],
});
