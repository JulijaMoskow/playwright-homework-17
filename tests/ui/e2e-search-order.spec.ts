import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { NotFoundPage } from '../pages/order-not-found-page';
import { OrderDetailsPage } from '../pages/order-details-page';

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
    await notFoundPage.checkVisible(true);
});
test('Search order with mocked response', async ({ page }) => {
    await page.route('**/api/orders/**', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: 999,
                customerName: 'Julija',
                customerPhone: '+37258525282',
                comment: 'mock order',
                status: 'OPEN'
            })
        });
    });

    const loginPage = new LoginPage(page);

    await loginPage.open();

    const orderPage = await loginPage.signIn(
        process.env.TEST_USERNAME!,
        process.env.TEST_PASSWORD!
    );

    const orderDetailsPage = await orderPage.searchOrder(999) as OrderDetailsPage;

    await expect(page).toHaveURL(/orderId=999/);
    await orderDetailsPage.checkVisible(true);


});
test('Search order with server error', async ({ page }) => {
    await page.route('**/api/orders/**', async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Internal server error'
            })
        });
    });

    const loginPage = new LoginPage(page);

    await loginPage.open();

    const orderPage = await loginPage.signIn(
        process.env.TEST_USERNAME!,
        process.env.TEST_PASSWORD!
    );

    await orderPage.searchOrder(999);

    await expect(page).toHaveURL(/orderId=999/);
});
test('Search delivered order with mocked response', async ({ page }) => {
    await page.route('**/api/orders/**', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: 555,
                customerName: 'Julija',
                customerPhone: '+37258525282',
                comment: 'delivered order',
                status: 'DELIVERED'
            })
        });
    });

    const loginPage = new LoginPage(page);

    await loginPage.open();

    const orderPage = await loginPage.signIn(
        process.env.TEST_USERNAME!,
        process.env.TEST_PASSWORD!
    );
    const orderDetailsPage = new OrderDetailsPage(page);

    await orderPage.searchOrder(555);

    await expect(page).toHaveURL(/orderId=555/);

    await orderDetailsPage.checkVisible(true);

});