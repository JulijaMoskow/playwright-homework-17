import { expect, Locator, Page } from '@playwright/test';

export class OrderPage {
    readonly page: Page;
    readonly statusButton: Locator;
    readonly createOrderButton: Locator;
    readonly nameInput: Locator;
    readonly phoneInput: Locator;
    readonly commentInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.statusButton = page.getByRole('button').first();
        this.createOrderButton = page.locator('button').last();
        this.nameInput = page.locator('input').nth(0);
        this.phoneInput = page.locator('input').nth(1);
        this.commentInput = page.locator('input').nth(2);
    }

    async checkInnerComponents(): Promise<void> {
        await this.page.waitForTimeout(2000);

        await expect(this.statusButton).toBeVisible();
        await expect(this.createOrderButton).toBeVisible();
        await expect(this.nameInput).toBeVisible();
        await expect(this.phoneInput).toBeVisible();
        await expect(this.commentInput).toBeVisible();
    }
}