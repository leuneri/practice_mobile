import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config()

  test('Go into Whiteboard link and make new whiteboard', async ({ page }) => {

    const username = process.env.GOOGLE_USERNAME;
    const password = process.env.GOOGLE_PASSWORD;
    await page.goto('https://www.whiteboard.team/');

    await page.waitForLoadState();
    // need to sign in
    await page.locator('#authButton').click(),
    await page.waitForLoadState();
    await expect(page.locator('input[placeholder="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await page.locator('input[placeholder="email"]').fill(username!);
    await page.locator('input[placeholder="Password"]').fill(password!);
    await page.getByRole('button', { name: 'Log in' }).click();
    
    await page.waitForLoadState();
    await expect(page).toHaveTitle('Whiteboard Team')
    await page.getByRole('button', { name: 'New' }).click();
  // TODO: setup where we create a new notebook every time
  // await expect(signInPopup.getByTestId('Untitled Notebook-libraryThumbnailImage')).toBeVisible();
});
