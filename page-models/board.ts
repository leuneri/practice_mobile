import { Page } from '@playwright/test'

export class Board {
    locator(arg0: string): any {
      throw new Error('Method not implemented.');
    }
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async clickStartFromScratch(): Promise<void> {
        await this.page.getByText('Start From Scratch').click();
    }
}