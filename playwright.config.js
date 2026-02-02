import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: false, // Run sequentially to avoid browser chaos
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker for simpler testing
  reporter: [['html', { open: 'never' }]],
  
  use: {
    baseURL: 'http://127.0.0.1:5500',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
  },

  // Default: Just Desktop Chrome for development
  // Uncomment other projects for full cross-browser testing
  projects: [
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
    // Uncomment for mobile testing:
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    // {
    //   name: 'Tablet',
    //   use: { ...devices['iPad Pro'] },
    // },
  ],

  webServer: {
    command: 'npx http-server -p 5500 -c-1', // -c-1 disables caching
    url: 'http://127.0.0.1:5500',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
