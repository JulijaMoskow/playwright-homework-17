import dotenv from 'dotenv';

dotenv.config({ path: 'env/prod.env' });

const requiredVars: string[] = ['URL', 'TEST_USERNAME', 'TEST_PASSWORD'];

requiredVars.forEach((varName: string): void => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

export const SERVICE_URL: string = process.env.URL!;
export const USERNAME: string = process.env.TEST_USERNAME!;
export const PASSWORD: string = process.env.TEST_PASSWORD!;