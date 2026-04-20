import { test , expect } from "@playwright/test";

test('valid login test', async ({page}) => {
  await page.goto('https://account.riotgames.com');

  await page.getByTestId('input-username').fill('arseneon');

  await page.getByTestId('input-password').fill('niyukta123');
  await page.getByTestId('btn-signin-submit').click();

  
})
