import { test , expect } from "@playwright/test";

test('invalid username and valid password', async ({page}) => {
  await page.goto('https://account.riotgames.com');

  await page.getByTestId('input-username').fill('arseneonn');

  await page.getByTestId('input-password').fill('niyukta123');
  await page.getByTestId('btn-signin-submit').click();
  
  
})
