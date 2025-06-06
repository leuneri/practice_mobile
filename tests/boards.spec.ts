import dotenv from 'dotenv';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-models/loginPage';
import { DashBoard } from '../page-models/dashBoard';
import { Board } from '../page-models/board';
dotenv.config()
const username = process.env.GOOGLE_USERNAME;
const password = process.env.GOOGLE_PASSWORD;

test.describe('Board testing', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage: LoginPage;
    let dashBoard: DashBoard;
    loginPage = new LoginPage(page)
    dashBoard = new DashBoard(page);

    await page.goto('https://www.whiteboard.team/');

    await page.waitForLoadState();
    // need to sign in
    await page.locator('#authButton').click();
    await page.waitForLoadState();
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword(password!);
    await loginPage.clickLogin();
    await page.waitForLoadState();
    await dashBoard.expectOnDashBoard();
  });

  test.afterEach(async ({ page }) => {
    let dashBoard: DashBoard;
    await page.goto('https://www.whiteboard.team/app/panel/home');
    await page.waitForLoadState();
    await page.locator('[title="Personal"]').click();
    await page.waitForLoadState();
    dashBoard = new DashBoard(page);
    await dashBoard.deleteAllBoards();
  });

  test('Create a board', async ({ page }) => {
    let dashBoard: DashBoard;
    let board: Board;
    dashBoard = new DashBoard(page);
    board = new Board(page);

    await dashBoard.clickNewBoard();
    await page.waitForLoadState();
    await board.clickStartFromScratch();
    await expect(page.locator('#penTypeTb')).toBeVisible();
  })

  test('Draw on board', async ({ page }) => {
    // How much to draw on board?
  })


})
