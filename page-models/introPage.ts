import { Page, Locator } from '@playwright/test'

export class IntroPage {
    readonly page: Page;
    readonly DashboardButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.DashboardButton = page.locator('#authButton');
    }
}
