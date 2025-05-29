import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.goodnotes.com/web');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Goodnotes for Web | Free to Download');
});

test('Try Goodnotes for Web link', async ({ page }) => {
  await page.goto('https://www.goodnotes.com/web');

  // Click the 'Try Goodnotes for Web' link.
  const [notebookPage] = await Promise.all([
    page.context().waitForEvent('page'), // Wait for the new tab to open
    page.locator('.web-buttons-flexbox-div', { hasText: 'Try Goodnotes for Web' }).click()
  ]);

  await notebookPage.waitForLoadState();

  await expect(notebookPage).toHaveURL('https://web.goodnotes.com/home');
  // need to sign in

  // TODO: setup where we create a new notebook every time
  await expect(page.getByTestId('Untitled Notebook-libraryThumbnailImage')).toBeVisible();
});
