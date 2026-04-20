import { test } from "@playwright/test";
import { LoginPage } from '../pageObjects/login.po';
const testData = require('../fixtures/loginfixtures.json');

test.beforeEach(async ({ page }) => {
  await(page.goto('/'));
})

test.describe('Valid login test',() => {
  test('Login using valid username and password', async ({page}) => {
      const login = new LoginPage(page);
      await login.login(testData.validUser.userName,testData.validUser.password);
      await login.verifyvalidLogin();
  })
})

test.describe('Invalid login test',() => {
  test('Login using invalid username and password', async ({page}) => {
      const login = new LoginPage(page);
      await login.login(testData.invaliUser.userName,testData.invaliUser.password);
      await login.verifyInvalidLogin();
  })
  
  test('Login using valid username and invalid password', async ({page}) => {
      const login = new LoginPage(page);
      await login.login(testData.validUser.userName,testData.invaliUser.password);
      await login.verifyInvalidLogin();
  })

  test('Login using invalid username and valid password', async ({page}) => {
      const login = new LoginPage(page);
      await login.login(testData.invaliUser.userName,testData.validUser.password);
      await login.verifyInvalidLogin();
  })
  test('Login using no username and no password and click login', async ({page}) => {
      const login = new LoginPage(page);
      await login.login("","");
      await login.verifyInvalidLogin();
  })
  test('Login using no username and click login', async ({page}) => {
      const login = new LoginPage(page);
      await login.login("",testData.validUser.password);
      await login.verifyInvalidLogin();
  })
  
})

test.afterEach(async ({ page })=>{
    await page.close();

})

