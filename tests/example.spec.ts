import dotenv from 'dotenv';
import { test } from '@playwright/test';
import { LoginPage } from '../page-models/loginPage';
import { PersonalBoard } from '../page-models/personalBoard';
dotenv.config()

test.describe('Board testing', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage: LoginPage;
    let personalBoard: PersonalBoard;
    loginPage = new LoginPage(page)
    personalBoard = new PersonalBoard(page);
    const username = process.env.GOOGLE_USERNAME;
    const password = process.env.GOOGLE_PASSWORD;
    await page.goto('https://www.whiteboard.team/');

    await page.waitForLoadState();
    // need to sign in
    await page.locator('#authButton').click(),
    await page.waitForLoadState();
    loginPage.enterEmail(username!);
    loginPage.enterPassword(password!);
    loginPage.clickLogin();
    await page.waitForLoadState();
    personalBoard.expectOnPersonalBoard();
  });

  test.afterEach(async ({ page }) => {
    let personalBoard: PersonalBoard;
    personalBoard = new PersonalBoard(page);
    personalBoard.deleteAllBoards();
  });


})
