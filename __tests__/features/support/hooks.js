const { After, Before, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { driver } = require('./web_driver');

const api = require('axios');

//set default step timeout
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
    await api.get('https://csi-covid-staging.herokuapp.com/').catch(() => {
        console.log('waking up the API');
    });
});

Before(async function () {
    //Before Scenario Hook
})

After(async function () {
    //After Scenario Hook

    //capture screenshot after each scenario
    let screenshot = await driver.takeScreenshot();
    this.attach(screenshot, 'image/png');
    //clean up cookies
    await driver.manage().deleteAllCookies();
});

AfterAll(async function () {
    //perform some shared teardown
    return driver.quit();
})

