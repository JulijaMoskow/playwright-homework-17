import { test, expect } from '../fixtures/auth.fixtures';
import { LoginPage } from '../pages/login-page';
import { PASSWORD, USERNAME } from '../../config/env-data';
import { OrderPage } from '../pages/order-page';

test('Login test + order page components check', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    const orderPage: OrderPage = await loginPage.signIn(USERNAME, PASSWORD);

    await orderPage.checkInnerComponents();
});
test('Login via localStorage jwt + order page components check', async ({ page, authToken }) => {

const orderPage = new OrderPage(page);

await page.goto('/');

await page.evaluate((token) => {
localStorage.setItem('jwt', token);
}, authToken);

await page.reload();

await orderPage.checkInnerComponents();
});