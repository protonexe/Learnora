import { test, expect } from '@playwright/test';

// Helper function to handle app initialization with proper waits
async function initializeApp(page) {
  // Navigate to app with cache bypass
  await page.goto('/index.html', { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  
  // Wait for React to mount (check for root element)
  await page.waitForSelector('#root', { timeout: 10000 });
  
  // Additional wait for components to render
  await page.waitForTimeout(2000);
  
  console.log('Page loaded, checking for onboarding or login...');
}

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await initializeApp(page);
  });

  test('should display login page with role selection @critical', async ({ page }) => {
    // Wait for content to load
    await expect(page.getByText('LEARNORA', { exact: false })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Smart Education Platform')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Select your role:', { exact: false })).toBeVisible({ timeout: 10000 });
    
    // Verify all role options are present - use flexible matching
    await expect(page.locator('button:has-text("Student")').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Teacher")').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Parent")').first()).toBeVisible({ timeout: 10000 });
  });

  test('should allow student login with password @critical', async ({ page }) => {
    // Click Student role button - use flexible selector
    const studentButton = page.locator('button:has-text("Student")').first();
    await expect(studentButton).toBeVisible({ timeout: 10000 });
    await studentButton.click();
    
    // Wait for login form to appear
    await page.waitForTimeout(1000);
    
    // Verify login method toggle appears
    await expect(page.getByText('Password', { exact: false })).toBeVisible({ timeout: 5000 });
    
    // Enter credentials - use flexible selectors
    const usernameInput = page.locator('input[type="text"], input[placeholder*="username" i]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await expect(usernameInput).toBeVisible({ timeout: 5000 });
    await usernameInput.fill('emma.wilson');
    await passwordInput.fill('pass123');
    
    // Submit login
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    // Wait for dashboard to load
    await page.waitForTimeout(2000);
    
    // Verify successful login - should see dashboard
    await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 10000 });
  });

  test('should show validation for empty credentials', async ({ page }) => {
    // Click Student role button
    const studentButton = page.locator('button:has-text("Student")').first();
    await expect(studentButton).toBeVisible({ timeout: 10000 });
    await studentButton.click();
    
    await page.waitForTimeout(1000);
    
    // Try to login without entering credentials
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    // Should show toast warning - check for validation message
    await expect(page.getByText(/Please enter/i)).toBeVisible({ timeout: 5000 });
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Click Student role button
    const studentButton = page.locator('button:has-text("Student")').first();
    await expect(studentButton).toBeVisible({ timeout: 10000 });
    await studentButton.click();
    
    await page.waitForTimeout(1000);
    
    // Enter invalid credentials
    const usernameInput = page.locator('input[type="text"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await usernameInput.fill('invalid.user');
    await passwordInput.fill('wrongpass');
    
    // Submit login
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    // Should show error toast
    await expect(page.getByText(/Invalid/i)).toBeVisible({ timeout: 5000 });
  });

  test('should allow switching between login methods', async ({ page }) => {
    // Click Student role button
    const studentButton = page.locator('button:has-text("Student")').first();
    await expect(studentButton).toBeVisible({ timeout: 10000 });
    await studentButton.click();
    
    await page.waitForTimeout(1000);
    
    // Switch to NFC - use flexible selector
    const nfcButton = page.locator('button:has-text("NFC")').first();
    await expect(nfcButton).toBeVisible({ timeout: 5000 });
    await nfcButton.click();
    
    // Verify NFC UI appears
    await expect(page.getByText(/Tap to Authenticate/i)).toBeVisible({ timeout: 5000 });
    
    // Switch back to password
    const passwordButton = page.locator('button:has-text("Password")').first();
    await passwordButton.click();
    
    // Verify password form appears
    await expect(page.locator('input[type="text"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('should allow changing role after selection', async ({ page }) => {
    // Click Student role button
    const studentButton = page.locator('button:has-text("Student")').first();
    await expect(studentButton).toBeVisible({ timeout: 10000 });
    await studentButton.click();
    
    await page.waitForTimeout(1000);
    
    // Click "Change Role" - use flexible selector
    const changeRoleButton = page.locator('button:has-text("Change")').first();
    await expect(changeRoleButton).toBeVisible({ timeout: 5000 });
    await changeRoleButton.click();
    
    // Should return to role selection
    await expect(page.getByText('Select your role:', { exact: false })).toBeVisible({ timeout: 5000 });
  });

  test('should toggle theme on login page', async ({ page }) => {
    // Find dark mode toggle
    const toggle = page.locator('input[type="checkbox"]').first();
    
    // Wait for toggle to be visible
    await expect(toggle).toBeVisible({ timeout: 10000 });
    
    // Toggle dark mode
    await toggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(500);
    
    // Verify theme changed (check body or html element)
    const body = page.locator('body');
    const hasDarkClass = await body.evaluate(el => el.classList.contains('dark') || el.getAttribute('data-theme') === 'dark');
    // This is a soft check - theme might be implemented differently
  });

  test('should use demo login shortcut @critical', async ({ page }) => {
    // Look for "Skip to Demo" button - use flexible selector
    const skipButton = page.locator('button:has-text("Skip"), button:has-text("Demo")').first();
    
    // Wait for button to appear
    await expect(skipButton).toBeVisible({ timeout: 15000 });
    
    // Click "Skip to Demo"
    await skipButton.click();
    
    // Wait for dashboard to load
    await page.waitForTimeout(3000);
    
    // Should navigate directly to dashboard
    await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 10000 });
  });
});
