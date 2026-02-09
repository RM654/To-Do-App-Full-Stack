const { test, expect } = require('@playwright/test');

test.describe('ToDo App E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should create a new task and mark it done', async ({ page }) => {
    const uniqueTitle = `E2E Test Task ${Date.now()}`;
    const description = 'This is an end-to-end test task.';

    // Fill in title and description
    await page.fill('input#title', uniqueTitle);
    await page.fill('textarea#description', description);

    // Click "Create Task"
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Wait for the task to appear
    console.log('Waiting for task heading...');
    const newTaskHeading = page.getByRole('heading', { name: uniqueTitle });
    await expect(newTaskHeading).toBeVisible();
    console.log('Task heading is visible');

    // ✅ Go two levels up from the heading to get the task card
    const taskCard = newTaskHeading.locator('..').locator('..');

    // Check the title and description inside the card
    await expect(taskCard.getByRole('heading')).toHaveText(uniqueTitle);
    await expect(taskCard.locator('p')).toHaveText(description);

    // ✅ Click the "Done" button
    console.log('Checking for Done button inside taskCard...');
    await expect(taskCard.getByRole('button', { name: 'Done' })).toBeVisible();
    await taskCard.getByRole('button', { name: 'Done' }).click();

    // ✅ Wait for the task to be removed
    await expect(page.getByRole('heading', { name: uniqueTitle })).toHaveCount(0);
  }, 60000); // Timeout set to 60 seconds

  test('should not show more than 5 tasks', async ({ page }) => {
    const taskCount = await page.locator('[data-testid^="task-"]').count();
    expect(taskCount).toBeLessThanOrEqual(5);
  });
});
