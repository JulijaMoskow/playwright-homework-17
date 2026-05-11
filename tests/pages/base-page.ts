import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly footer: Locator;
    readonly languageSwitcher: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.getByText('Privacy Policy');
        this.languageSwitcher = page.getByText('EN').first();
    }

    async checkFooterVisible(): Promise<void> {
        await expect(this.footer).toBeVisible();
    }

    async checkLanguageSwitcherVisible(): Promise<void> {
        await expect(this.languageSwitcher).toBeVisible();
    }
}