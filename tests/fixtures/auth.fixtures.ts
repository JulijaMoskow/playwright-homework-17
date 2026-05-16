import { test as base } from '@playwright/test';

type AuthFixture = {
authToken: string;
};

export const test = base.extend<AuthFixture>({
authToken: async ({ request }, use) => {
await use('debug-token');
},
});

export { expect } from '@playwright/test';
