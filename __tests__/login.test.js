/* eslint-env jest*/
const puppeteer = require('puppeteer');
const timeout = 60000;
jest.setTimeout(timeout);

describe('Test index page:', () => {
    
    it("Login button reverts to Login Page:", async () => {
        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://ohmywordle.azurewebsites.net/')

        await page.click('[name="landing"]');

        await expect(page.title()).resolves.toMatch('OMW! Login');
        await browser.close();
     })
})