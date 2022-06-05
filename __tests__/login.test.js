/* eslint-env jest*/
const puppeteer = require('puppeteer');
const timeout = 90000;
jest.setTimeout(timeout);

describe('Test routing, security and login:', () => {
    
    it("Login button routes to the Login Page:", async () => {
        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://ohmywordle.azurewebsites.net/')

        await page.click('[name="start"]');
        await page.waitForTimeout(10);
        await expect(page.title()).resolves.toMatch('OMW! Login');
        await page.waitForTimeout(1000);
        await browser.close();
     })
     
     it("Create Account button routes to the Create Account Page:", async () => {

        const browser = await puppeteer.launch()
        
        const page = await browser.newPage()
        await page.setViewport({width: 1920, height: 1080});
        await page.goto('https://ohmywordle.azurewebsites.net/')

        await page.click('[name="start"]');
        await page.waitForTimeout(10);
        await page.click('[name="createButton"]');
        await expect(page.title()).resolves.toMatch('OMW! Create account');
        await page.waitForTimeout(1000);
        await browser.close();
     })
     it('Successful Login routes to HomePage:', async () => {

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({width: 1920, height: 1080});
        await page.goto('https://ohmywordle.azurewebsites.net/')
        
        await page.click('[name="start"]');

        await page.waitForSelector('input[name="username"]');
        await page.$eval('input[name="username"]', el => el.value = 'Trist');

        await page.waitForSelector('input[name="password"]');
        await page.$eval('input[name="password"]', el => el.value = '123');

        await page.click('[name="loginbutton"]');
        await page.waitForTimeout(10);
        await expect(page.title()).resolves.toMatch('OMW! Game Menu');
        await page.waitForTimeout(1000);
        await browser.close();
    })
    it('Unsuccessful Login due to wrong password reloads the Login Page:', async () => {

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({width: 1920, height: 1080});
        await page.goto('https://ohmywordle.azurewebsites.net/')
        
        await page.click('[name="start"]');

        await page.waitForSelector('input[name="username"]');
        await page.$eval('input[name="username"]', el => el.value = 'Trist');

        await page.waitForSelector('input[name="password"]');
        await page.$eval('input[name="password"]', el => el.value = '1234');

        await page.click('[name="loginbutton"]');
        await page.waitForTimeout(10);
        await expect(page.title()).resolves.toMatch('OMW! Login');
        await page.waitForTimeout(1000);
        await browser.close();
    })
    it("Attempting to go to menu without login directs you to login page:", async () => {
        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://ohmywordle.azurewebsites.net/home')

        //await page.click('[name="start"]');
        await page.waitForTimeout(10);
        await expect(page.title()).resolves.toMatch('OMW! Login');
        await page.waitForTimeout(1000);
        await browser.close();
     })

})