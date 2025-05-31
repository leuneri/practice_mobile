import { expect, Page } from '@playwright/test'

export class DashBoard {
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async expectOnDashBoard(): Promise<void> {
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

    async clickNewBoard(): Promise<void> {
        const newButton = this.page.getByRole('button', { name: 'New'});
        newButton.click();
    }
}