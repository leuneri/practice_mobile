import { Page, Locator } from '@playwright/test'

export class HomePage {
    readonly page: Page;
    readonly PersonalButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.PersonalButton = page.locator('[title="Personal"]');
    }
}
