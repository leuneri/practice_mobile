import { expect, Page } from '@playwright/test'

export class PersonalBoard {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async expectOnPersonalBoard(): Promise<void> {
        await expect(this.page).toHaveTitle('Whiteboard Team')
    }

    async deleteAllBoards(): Promise<void> {
        while (await this.page.locator('[title="Delete"]').count() > 0) {
            const deleteButton = this.page.locator('[title="Delete"]').first();
            await deleteButton.click();
            const confirmDelete = this.page.getByRole('button', { name: 'Yes' });
            await confirmDelete.click();
        }
    }
}