require('chromedriver');
require('geckodriver');
require('dotenv').config();
//require('iedriver'); //add this package if you want to use it.
const webDriver = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

//create WebDriver instance based on your browser config;
function createDriver() {
    let browserConfig = process.env.BROWSER || 'chrome';
    let browser = browserConfig.toLowerCase();
    if (['chrome', 'firefox', 'ie'].indexOf(browser) < 0) browser = 'chrome'; //default to chrome
    let options;
    if (process.env.HEADLESS_BROWSER === 'true') options = new chrome.Options().headless();
    
    return new webDriver.Builder()
        .forBrowser(browser)
        .setChromeOptions(options)
        .usingServer(process.env.SELENIUM_URL)
        .build();
}

exports.driver = createDriver();