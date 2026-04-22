import { test } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { OrderPage } from './pages/order-page';
import { USERNAME, PASSWORD } from '../config/env-data';

test.describe('Order creation page', () => {
    test('login and check elements on order page', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        const orderPage: OrderPage = await loginPage.signIn(USERNAME, PASSWORD);

        await orderPage.checkInnerComponents();
    });
});