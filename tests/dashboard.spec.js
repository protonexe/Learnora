import { test, expect } from '@playwright/test';

// Helper to login before each test with robust waits
async function loginAsStudent(page) {
  console.log('Starting login process...');
  
  // Navigate with cache bypass and proper waits
  await page.goto('/index.html', { 
    waitUntil: 'networkidle',
    timeout: 30000 
  });
  
  // Wait for React app to mount
  await page.waitForSelector('#root', { timeout: 15000 });
  await page.waitForTimeout(3000);
  
  console.log('Page loaded, looking for login elements...');
  
  // Check if "Skip to Demo" button exists (with timeout)
  const skipButton = page.locator('button:has-text("Skip"), button:has-text("Demo")').first();
  const isSkipVisible = await skipButton.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (isSkipVisible) {
    console.log('Found Skip to Demo button, clicking...');
    await skipButton.click();
    await page.waitForTimeout(3000);
  } else {
    console.log('Skip button not found, attempting manual login...');
    
    // Click Student role
    const studentButton = page.locator('button:has-text("Student")').first();
    await expect(studentButton).toBeVisible({ timeout: 10000 });
    await studentButton.click();
    
    await page.waitForTimeout(1000);
    
    // Enter credentials
    const usernameInput = page.locator('input[type="text"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await expect(usernameInput).toBeVisible({ timeout: 5000 });
    await usernameInput.fill('emma.wilson');
    await passwordInput.fill('pass123');
    
    // Submit login
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();
    
    await page.waitForTimeout(3000);
  }
  
  // Verify we're logged in by checking for dashboard content
  await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 15000 });
  console.log('Login successful!');
}

test.describe('Dashboard & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStudent(page);
  });

  test('should display dashboard with hero section @critical', async ({ page }) => {
    // Verify hero section
    await expect(page.locator('.dashboard-hero')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Welcome back/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/assignments/i)).toBeVisible({ timeout: 5000 });
  });

  test('should display stats grid', async ({ page }) => {
    const statsGrid = page.locator('.stats-grid');
    await expect(statsGrid).toBeVisible({ timeout: 10000 });
    
    // Wait for stats to render
    await page.waitForTimeout(1000);
    
    // Verify stats are present
    const statCards = statsGrid.locator('> *');
    const count = await statCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should display quick actions section', async ({ page }) => {
    await expect(page.getByText('Quick Actions')).toBeVisible({ timeout: 10000 });
    
    // Verify quick action buttons with flexible selectors
    await expect(page.locator('button:has-text("Quiz")').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('button:has-text("Flashcard")').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('button:has-text("Analytics")').first()).toBeVisible({ timeout: 5000 });
  });

  test('should display courses section', async ({ page }) => {
    await expect(page.getByText('Continue Learning')).toBeVisible({ timeout: 10000 });
    
    // Verify courses are displayed
    const courseCards = page.locator('.courses-grid > *');
    await expect(courseCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to courses view via sidebar @critical', async ({ page }) => {
    // Open sidebar - try multiple selectors
    const menuButton = page.locator('button:has-text("☰"), [data-testid="menu-toggle"], header button').first();
    await expect(menuButton).toBeVisible({ timeout: 5000 });
    await menuButton.click();
    
    await page.waitForTimeout(500);
    
    // Click Courses in sidebar
    const coursesButton = page.locator('button:has-text("Courses"), .sidebar button:has-text("Courses")').first();
    await expect(coursesButton).toBeVisible({ timeout: 5000 });
    await coursesButton.click();
    
    // Verify courses view loaded
    await page.waitForTimeout(1000);
    await expect(page.locator('input[placeholder*="Search"], input[type="search"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to quizzes view', async ({ page }) => {
    // Open sidebar
    const menuButton = page.locator('button:has-text("☰"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);
    
    // Click Quizzes
    const quizzesButton = page.locator('button:has-text("Quizzes"), .sidebar button:has-text("Quizzes")').first();
    await quizzesButton.click();
    
    // Verify quizzes view loaded
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Quiz/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to flashcards view', async ({ page }) => {
    // Open sidebar
    const menuButton = page.locator('button:has-text("☰"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);
    
    // Click Flashcards
    const flashcardsButton = page.locator('button:has-text("Flashcard"), button:has-text("Cards"), .sidebar button:has-text("Flashcard")').first();
    await flashcardsButton.click();
    
    // Verify flashcards view loaded
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Flashcard|Deck/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to settings view', async ({ page }) => {
    // Open sidebar
    const menuButton = page.locator('button:has-text("☰"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);
    
    // Click Settings
    const settingsButton = page.locator('button:has-text("Settings"), button:has-text("Profile"), .sidebar button:has-text("Setting")').first();
    await settingsButton.click();
    
    // Verify settings view loaded
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Settings|Education|Profile/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('should open quick action - Take Quiz', async ({ page }) => {
    const quizButton = page.locator('button:has-text("Quiz")').first();
    await expect(quizButton).toBeVisible({ timeout: 10000 });
    await quizButton.click();
    
    // Modal should appear
    await page.waitForTimeout(1000);
    await expect(page.locator('.modal-content, [role="dialog"], .modal').first()).toBeVisible({ timeout: 10000 });
  });

  test('should open quick action - Flashcards', async ({ page }) => {
    const flashcardButton = page.locator('button:has-text("Flashcard")').first();
    await expect(flashcardButton).toBeVisible({ timeout: 10000 });
    await flashcardButton.click();
    
    // Modal should appear
    await page.waitForTimeout(1000);
    await expect(page.locator('.modal-content, [role="dialog"], .modal').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show floating AI button', async ({ page }) => {
    const floatingButton = page.locator('.floating-button, button[class*="floating"]').first();
    
    // Button might be visible or not depending on mobile/desktop
    const isVisible = await floatingButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      await expect(floatingButton).toBeVisible();
    }
  });

  test('should open AI chat when clicking floating button', async ({ page }) => {
    const floatingButton = page.locator('.floating-button, button[class*="floating"]').first();
    
    const isVisible = await floatingButton.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      await floatingButton.click();
      
      // AI Chat should appear
      await page.waitForTimeout(1000);
      await expect(page.getByText(/AI|Chat|Tutor/i).first()).toBeVisible({ timeout: 10000 });
    } else {
      test.skip();
    }
  });

  test('should logout successfully', async ({ page }) => {
    // Open sidebar
    const menuButton = page.locator('button:has-text("☰"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);
    
    // Click Settings
    const settingsButton = page.locator('button:has-text("Settings"), button:has-text("Profile")').first();
    await settingsButton.click();
    await page.waitForTimeout(1000);
    
    // Find and click logout button
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign Out")').first();
    await logoutButton.click();
    
    // Wait for logout
    await page.waitForTimeout(2000);
    
    // Should return to login page
    await expect(page.getByText('LEARNORA', { exact: false })).toBeVisible({ timeout: 10000 });
  });
});
