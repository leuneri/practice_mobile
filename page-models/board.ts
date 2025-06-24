import { expect, Page, Locator } from '@playwright/test'

export class Board {
    readonly page: Page;
    readonly penType: Locator;

    constructor(page: Page){
        this.page = page;
        this.penType = page.locator('#penTypeTb');
    }

    async clickStartFromScratch(): Promise<void> {
        const startFromScratchButton = this.page.getByText('Start From Scratch');
        await expect(startFromScratchButton).toBeVisible();
        await startFromScratchButton.click();
    }
}