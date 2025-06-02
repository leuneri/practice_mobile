import { expect, Page } from '@playwright/test'

export class Board {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async clickStartFromScratch(): Promise<void> {
        const startFromScratchButton = this.page.getByText('Start From Scratch');
        await expect(startFromScratchButton).toBeVisible();
        await startFromScratchButton.click();
    }
}