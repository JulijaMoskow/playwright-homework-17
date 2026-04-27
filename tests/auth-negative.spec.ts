import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Auth negative tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/signin');
    });

    test('should stay on signin page when both fields are empty', async ({ page }) => {
        const signInButton = page.getByRole('button', { name: /sign in/i });

        await signInButton.click();

        await expect(page).toHaveURL(/signin/);
    });

    test('button should stay disabled when only login is filled', async ({ page }) => {
        const loginInput = page.getByRole('textbox').first();
        const signInButton = page.getByRole('button', { name: /sign in/i });

        await loginInput.fill(faker.internet.username());

        await expect(signInButton).toBeDisabled();
    });

    test('button should stay disabled when password is invalid', async ({ page }) => {
        const loginInput = page.getByRole('textbox').first();
        const passwordInput = page.locator('input[type="password"]');
        const signInButton = page.getByRole('button', { name: /sign in/i });

        await loginInput.fill(faker.internet.username());
        await passwordInput.fill(faker.internet.password({ length: 3 }));

        await expect(signInButton).toBeDisabled();
    });
});