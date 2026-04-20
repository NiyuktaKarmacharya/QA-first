import { test } from "@playwright/test";
import { LoginPage } from '../pageObjects/login.po';
import { ContactPage } from '../pageObjects/contact.po';
const testData = require('../fixtures/loginfixtures.json');
const contactTestData = require('../fixtures/contactfixtures.json');
const {authenticateUser,createEntity,getEntity,validateEntity} = require('../utils/helper.spec.js');
let accessToken;

test.beforeEach(async ({ page }) => {
  const login= new LoginPage(page);
  await(page.goto('/'));
  await login.login("abcdabcd@gmail.com","abcd123");
  await login.verifyvalidLogin();
})

test.describe('Contact testcases',() => {
  test('Contact Add test', async ({page,request}) => {
      const contact = new ContactPage(page);
      await contact.contactAdd("Niyukta","Karmacharya","2004-08-04","niyukta@gmail.com","9810000000","nayabazar","kathmandu","kathmandu","44600","Nepal")
      await contact.viewContact();
      await contact.validateContactCreated("Niyukta","Karmacharya","2004-08-04","niyukta@gmail.com","9810000000","nayabazar","kathmandu","kathmandu","44600","Nepal");
  })
  test('Contact Edit test', async ({page,request}) => {
      
  const Data={
     "firstName": "Saumik",
      "lastName": "Shrestha",
      "birthdate": "2002-12-21",
      "email": "saumik@gmail.com",
      "phone": "98123456789",
      "street1": "Nayabazar",
      "city": "kathmandu",
      "stateProvince": "kathmadndu",
      "postalCode": "12345",
      "country": "Nepal"

  
}
      const contact = new ContactPage(page);
      accessToken=await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
      await createEntity(Data, accessToken, '/contacts',{ request });
      page.reload();
      await contact.viewContact();
      await contact.contactEdit(contactTestData.contact.firstName,contactTestData.contact.lastName,contactTestData.contact.birthdate,contactTestData.contact.email,contactTestData.contact.phone,contactTestData.contact.street1,contactTestData.contact.city,contactTestData.contact.stateProvince,contactTestData.contact.postalCode,contactTestData.contact.country
      );
      await contact.validateContactCreated(contactTestData.contact.firstName,contactTestData.contact.lastName,contactTestData.contact.birthdate,contactTestData.contact.email,contactTestData.contact.phone,contactTestData.contact.street1,contactTestData.contact.city,contactTestData.contact.stateProvince,contactTestData.contact.postalCode,contactTestData.contact.country
      );
      


  })
  test.only('Contact Delete test', async ({ page,request }) => {
    const Data={
      "firstName": "Saumik",
      "lastName": "Shrestha",
      "birthdate": "2002-12-21",
      "email": "saumik@gmail.com",
      "phone": "98123456789",
      "street1": "Nayabazar",
      "city": "kathmandu",
      "stateProvince": "kathmadndu",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new ContactPage(page);
    accessToken = await authenticateUser(testData.validUser.userName,testData.validUser.password, {request});
    await createEntity(Data, accessToken, '/contacts',{ request });
    page.reload();
    await contact.viewContact();
    const id = await getEntity(accessToken, '/contacts', '200' ,{ request });
    await contact.contactDelete();
    await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
  })
})