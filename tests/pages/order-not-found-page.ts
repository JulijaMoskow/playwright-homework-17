import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class NotFoundPage extends BasePage {
    readonly pageContent: Locator

    constructor(page: Page) {
        super(page)

        this.pageContent = page.locator('body')
    }

    async checkVisible(visible: boolean): Promise<void> {
        await expect(this.pageContent).toContainText('Введите номер заказа')
    }
}