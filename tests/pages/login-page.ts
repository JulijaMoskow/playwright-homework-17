import { Locator, Page } from '@playwright/test';
import { OrderPage } from './order-page';
import { SERVICE_URL } from '../../config/env-data';

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly signInButton: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = SERVICE_URL;
        this.usernameField = page.getByRole('textbox').first();
        this.passwordField = page.locator('input[type="password"]');
        this.signInButton = page.locator('button');
    }

    async open(): Promise<void> {
        await this.page.goto(this.url);
    }

    async signIn(username: string, password: string): Promise<OrderPage> {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.last().click();
        return new OrderPage(this.page);
    }
}