import dotenv from 'dotenv';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-models/loginPage';
import { DashBoard } from '../page-models/dashBoard';
import { Board } from '../page-models/board';
dotenv.config()

test.describe('Board testing', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage: LoginPage;
    let dashBoard: DashBoard;
    loginPage = new LoginPage(page)
    dashBoard = new DashBoard(page);
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
    dashBoard.expectOnDashBoard();
  });

  test.afterEach(async ({ page }) => {
    let dashBoard: DashBoard;
    dashBoard = new DashBoard(page);
    dashBoard.deleteAllBoards();
  });

  test('Create a board', async ({ page }) => {
    let dashBoard: DashBoard;
    let board: Board;
    dashBoard = new DashBoard(page);
    board = new Board(page);

    dashBoard.clickNewBoard();
    board.clickStartFromScratch();
    expect(board.locator('#penTypeTb')).toBeVisible();
  })

  test('Draw on board', async ({ page }) => {
    // How much to draw on board?
  })


})
