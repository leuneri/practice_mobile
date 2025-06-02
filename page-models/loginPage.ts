import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly forgotPasswordButton: Locator;
    readonly createAccountButtonAfterError: Locator;
    readonly createAccountButtonGeneral: Locator;
    readonly mainPageButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.forgotPasswordButton = page.getByRole('link', { name: 'Forgot password' });
        this.createAccountButtonAfterError = page.getByRole('link', { name: 'create account' }).first();
        this.mainPageButton = page.getByText('Whiteboard Team');
    }

    async enterEmail(email: string): Promise<void> {
        await this.page.locator('input[placeholder="email"]').fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.locator('input[placeholder="Password"]').fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }

    async invalidLoginErrorHandlingCheck(): Promise<void> {
        await expect(this.page.getByText('Invalid username or password.')).toBeVisible();
        await expect(this.page.locator('.text-danger').first()).toHaveText('Invalid username or password.');
        await expect(this.page.locator('.text-danger').nth(1)).toHaveText(/New user\?/);
    }
}