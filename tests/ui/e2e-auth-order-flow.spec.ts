import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PASSWORD, USERNAME } from '../../config/env-data';
import { OrderPage } from '../pages/order-page';

test('Login test + order page components check', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    const orderPage: OrderPage = await loginPage.signIn(USERNAME, PASSWORD);

    await orderPage.checkInnerComponents();
});

