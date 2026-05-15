import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class OrderDetailsPage extends BasePage {
    readonly details: Locator

    constructor(page: Page) {
        super(page)

        this.details = this.page.locator('body')
    }

    async checkVisible(visible: boolean): Promise<void> {
        await expect(this.details).toBeVisible({ visible })
    }
}