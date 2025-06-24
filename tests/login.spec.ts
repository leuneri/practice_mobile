import dotenv from 'dotenv';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-models/loginPage';
import { DashBoard } from '../page-models/dashBoard';
import { IntroPage } from '../page-models/introPage'
dotenv.config()
const username = process.env.GOOGLE_USERNAME;
const password = process.env.GOOGLE_PASSWORD;
let loginPage: LoginPage;
let dashBoard: DashBoard;
let introPage: IntroPage;

test.describe('Login testing', () => {
  test.beforeEach(async ({ page }) => {
    introPage = new IntroPage(page);
    await page.goto('https://www.whiteboard.team/');
    await page.waitForLoadState();
    // need to sign in
    await introPage.DashboardButton.click(),
    await page.waitForLoadState();
  });

  test.afterEach(async ({ page }) => {
    // is there anything to teardown?
  });

  test('Happy case', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashBoard = new DashBoard(page);
    await loginPage.login(username!, password!);
    await page.waitForLoadState();
    await dashBoard.expectOnDashBoard();
  })

  test('Incorrect password shows error', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(username!, '123456');
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Incorrect email shows error', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login('email', password!);
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Blank email and password shows error', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Forgot password button redirects to right page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(username!, '123456'!);
    await loginPage.invalidLoginErrorHandlingCheck();
  })

  test('Create account after failing to put correct credentials redirects to right page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.clickLogin();
    await loginPage.invalidLoginErrorHandlingCheck();
    await loginPage.createAccountButtonAfterError.click();
    await page.waitForLoadState();
    expect(loginPage.createAccountButtonGeneral).toBeVisible();
  })

  test('Whiteboard Team logo redirects to main page', async ({ page }) => {
    loginPage = new LoginPage(page);
    introPage = new IntroPage(page);
    await loginPage.mainPageButton.click();
    await page.waitForLoadState();
    expect(introPage.DashboardButton.click());
  })

//   test('Going back after login shows expected page', async ({ page }) => {

//   })



})