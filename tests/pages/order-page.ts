import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { NotFoundPage } from './order-not-found-page';
import { OrderDetailsPage } from './order-details-page';

export class OrderPage extends BasePage {

    readonly statusButton: Locator;
    readonly createOrderButton: Locator;
    readonly nameInput: Locator;
    readonly phoneInput: Locator;
    readonly commentInput: Locator;

    constructor(page: Page) {
        super(page);

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

    async searchOrder(orderId: number): Promise<NotFoundPage | OrderDetailsPage> {
      

        const url = new URL(this.page.url());
        url.searchParams.set('orderId', String(orderId));

        await this.page.goto(url.toString());

        if (orderId === 0) {
            return new NotFoundPage(this.page);
        }

        return new OrderDetailsPage(this.page);
    }
}