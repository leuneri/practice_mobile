import dotenv from 'dotenv';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-models/loginPage';
import { DashBoard } from '../page-models/dashBoard';
dotenv.config()
const username = process.env.GOOGLE_USERNAME;
const password = process.env.GOOGLE_PASSWORD;

test.describe('Login testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.whiteboard.team/');
    await page.waitForLoadState();
    // need to sign in
    await page.locator('#authButton').click(),
    await page.waitForLoadState();
  });

  test.afterEach(async ({ page }) => {
    // is there anything to teardown?
  });

  test('Happy case', async ({ page }) => {
    let loginPage: LoginPage;
    let dashBoard: DashBoard;
    loginPage = new LoginPage(page);
    dashBoard = new DashBoard(page);
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword(password!);
    await loginPage.clickLogin();
    await page.waitForLoadState();
    await dashBoard.expectOnDashBoard();
  })

  test('Incorrect password shows error', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword('123456');
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Incorrect email shows error', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);
    await loginPage.enterEmail('email');
    await loginPage.enterPassword(password!);
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Blank email and password shows error', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Forgot password button redirects to right page', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);
    await loginPage.enterEmail(username!);
    await loginPage.enterPassword('123456');
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Create account after failing to put correct credentials redirects to right page', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
    await loginPage.createAccountButtonAfterError.click();
    await page.waitForLoadState();
    expect(page.getByRole('button', { name: 'Create Account' }));
  })

  test('Whiteboard Team logo redirects to main page', async ({ page }) => {
    let loginPage: LoginPage;
    loginPage = new LoginPage(page);
    await loginPage.mainPageButton.click();
    await page.waitForLoadState();
    expect(page.locator('#authButton').click());
  })

//   test('Going back after login shows expected page', async ({ page }) => {

//   })



})