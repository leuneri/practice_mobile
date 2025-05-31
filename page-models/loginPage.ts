import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    constructor(page: Page){
        this.page = page
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
}