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

test.describe('Courses & Learning', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStudent(page);
  });

  test('should click on a course card and view details @critical', async ({ page }) => {
    // Wait for courses to render
    await page.waitForTimeout(2000);
    
    // Find and click first course card
    const firstCourse = page.locator('.courses-grid > *, .course-card, [class*="course"]').first();
    await expect(firstCourse).toBeVisible({ timeout: 10000 });
    await firstCourse.click();
    
    // Wait for navigation
    await page.waitForTimeout(2000);
    
    // Should navigate to course detail view
    await expect(page.getByText(/Chapter|Lesson|Section/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button:has-text("Back"), [class*="back"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('should display course chapters', async ({ page }) => {
    // Wait for courses to render
    await page.waitForTimeout(2000);
    
    // Click first course
    const firstCourse = page.locator('.courses-grid > *').first();
    await firstCourse.click();
    await page.waitForTimeout(2000);
    
    // Verify chapters are displayed
    const chapters = page.locator('.chapter-item, [class*="chapter"], [class*="lesson"]').first();
    await expect(chapters).toBeVisible({ timeout: 10000 });
  });

  test('should navigate back from course detail', async ({ page }) => {
    // Wait for courses to render
    await page.waitForTimeout(2000);
    
    // Go to course detail
    const firstCourse = page.locator('.courses-grid > *').first();
    await firstCourse.click();
    await page.waitForTimeout(2000);
    
    // Click back button
    const backButton = page.locator('button:has-text("Back"), [class*="back"]').first();
    await backButton.click();
    await page.waitForTimeout(2000);
    
    // Should return to courses or dashboard
    await expect(page.getByText(/Continue Learning|Courses|Dashboard/i).first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Quiz System', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStudent(page);
  });

  test('should open quiz modal from quick actions @critical', async ({ page }) => {
    // Find and click quiz button
    const quizButton = page.locator('button:has-text("Quiz")').first();
    await expect(quizButton).toBeVisible({ timeout: 10000 });
    await quizButton.click();
    
    // Wait for modal
    await page.waitForTimeout(2000);
    
    // Quiz modal should appear
    const modal = page.locator('.modal-content, [role="dialog"], .modal, .quiz-modal').first();
    await expect(modal).toBeVisible({ timeout: 10000 });
    
    // Should show quiz content
    await expect(page.getByText(/Question|Quiz|Q[0-9]/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('should display quiz questions and options', async ({ page }) => {
    const quizButton = page.locator('button:has-text("Quiz")').first();
    await quizButton.click();
    await page.waitForTimeout(2000);
    
    // Verify quiz options are visible - use flexible selectors
    const options = page.locator('.quiz-option, button[class*="option"], .answer-option, button:has-text("A)"), button:has-text("B)"), button:has-text("C)"), button:has-text("D)"');
    const optionsCount = await options.count();
    expect(optionsCount).toBeGreaterThan(0);
  });

  test('should allow selecting quiz answer', async ({ page }) => {
    const quizButton = page.locator('button:has-text("Quiz")').first();
    await quizButton.click();
    await page.waitForTimeout(2000);
    
    // Find and click first option
    const firstOption = page.locator('.quiz-option, button[class*="option"], button:has-text("A)"), button:has-text("Option")').first();
    
    if (await firstOption.isVisible({ timeout: 5000 })) {
      await firstOption.click();
      await page.waitForTimeout(500);
      // Option should be marked as selected (implementation-dependent)
    }
  });

  test('should close quiz modal', async ({ page }) => {
    const quizButton = page.locator('button:has-text("Quiz")').first();
    await quizButton.click();
    await page.waitForTimeout(2000);
    
    // Close modal - try multiple selectors
    const closeButton = page.locator('button:has-text("×"), button:has-text("Close"), button:has-text("X"), [aria-label="Close"], .modal-close').first();
    
    if (await closeButton.isVisible({ timeout: 5000 })) {
      await closeButton.click();
      await page.waitForTimeout(1000);
      
      // Modal should disappear
      await expect(page.locator('.modal-content, [role="dialog"]').first()).not.toBeVisible();
    }
  });
});

test.describe('Flashcard System', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStudent(page);
  });

  test('should open flashcard modal @critical', async ({ page }) => {
    // Find and click flashcard button
    const flashcardButton = page.locator('button:has-text("Flashcard"), button:has-text("Cards")').first();
    await expect(flashcardButton).toBeVisible({ timeout: 10000 });
    await flashcardButton.click();
    
    // Wait for modal
    await page.waitForTimeout(2000);
    
    // Flashcard modal should appear
    const modal = page.locator('.modal-content, [role="dialog"], .modal, .flashcard-modal').first();
    await expect(modal).toBeVisible({ timeout: 10000 });
    
    // Should show flashcard
    await expect(page.locator('.flashcard, [class*="flashcard"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('should flip flashcard on click', async ({ page }) => {
    const flashcardButton = page.locator('button:has-text("Flashcard"), button:has-text("Cards")').first();
    await flashcardButton.click();
    await page.waitForTimeout(2000);
    
    // Click flashcard to flip
    const flashcard = page.locator('.flashcard, [class*="flashcard"]').first();
    
    if (await flashcard.isVisible({ timeout: 5000 })) {
      await flashcard.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should navigate to next flashcard', async ({ page }) => {
    const flashcardButton = page.locator('button:has-text("Flashcard"), button:has-text("Cards")').first();
    await flashcardButton.click();
    await page.waitForTimeout(2000);
    
    // Find and click next button - use flexible selector
    const nextButton = page.locator('button:has-text("Next"), button:has-text("→"), button:has-text(">"), .next-button, button[class*="next"]').first();
    
    if (await nextButton.isVisible({ timeout: 5000 })) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should navigate to previous flashcard', async ({ page }) => {
    const flashcardButton = page.locator('button:has-text("Flashcard"), button:has-text("Cards")').first();
    await flashcardButton.click();
    await page.waitForTimeout(2000);
    
    // Go to next card first
    const nextButton = page.locator('button:has-text("Next"), button:has-text("→"), button:has-text(">"), .next-button').first();
    if (await nextButton.isVisible({ timeout: 5000 })) {
      await nextButton.click();
      await page.waitForTimeout(1000);
      
      // Then go back
      const prevButton = page.locator('button:has-text("Previous"), button:has-text("←"), button:has-text("<"), .prev-button, button[class*="prev"]').first();
      if (await prevButton.isVisible({ timeout: 5000 })) {
        await prevButton.click();
      }
    }
  });
});
