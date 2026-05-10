import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { NotFoundPage } from '../pages/order-not-found-page';

test('Search order with invalid orderId', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const notFoundPage = new NotFoundPage(page);

    await loginPage.open();

    const orderPage = await loginPage.signIn(
        process.env.TEST_USERNAME!,
        process.env.TEST_PASSWORD!
    );

    await orderPage.searchOrder(0);

    await page.waitForURL(/orderId=0/);
});