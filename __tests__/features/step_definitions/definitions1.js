const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { driver } = require('../support/web_driver');
const { By, until } = require('selenium-webdriver');
const path = require('path');

//// Your step definitions /////


const short_time = 1000
const long_time = 5000
const very_long_time = 30000

Given(/^Browse to web site "([^"]*)"$/, async function (url) {
    await driver.get(url);
});

Given("I press the {string}", async function (arg1) {
    await driver.wait(until.elementLocated(By.id(arg1)), very_long_time);
    await driver.findElement({ id: arg1 }).click();
});

Given("I press the {string}  and choose the file", async function (arg1) {
    // const image = path.join(__dirname, '..', '..', 'sumples', 'Raio_X.png');

    await driver.sleep(short_time)
    await driver.findElement({ id: "input-file" })
        .sendKeys("https://raw.githubusercontent.com/RayBasilio123/R5/master/Raio_X.png");
    await driver.sleep(short_time)
});

When("I press the option {string}", async function (arg1) {
    await driver.sleep(short_time)
    await driver.findElement({ css:arg1}).click();
});

When("in the {string} field, I type in the information {string}", async function (arg1,arg2) {
    await driver.sleep(short_time)
    await driver.findElement({ id: arg1 }).sendKeys(arg2);
});



When("I click  in the first  diagnostic image {string}", async function (arg1) {
    await driver.sleep(long_time)
    await driver.wait(until.elementLocated(By.css(arg1)));
    await driver.findElement({ css: arg1 }).click();
    
});

When("I see {string} written on the requested page", async function (arg1) {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/p[1]/b')), very_long_time);
const text = await driver.findElement({ xpath:'//*[@id="root"]/div/div/div/div/div[2]/p[1]/b' }).getText();
    console.log(text)
    assert.equal(arg1, text) 

});

When("I see {string} written on the requested page:xpath{string}", async function (arg1, arg2) {
    await driver.wait(until.elementLocated(By.xpath(arg2)), very_long_time);
    const text = await driver.findElement({ xpath: arg2 }).getText();
    console.log(text)
    assert.equal(arg1, text) 
    
});

Given("I enter {string} in {string}", async function (arg1, arg2) {
    await driver.sleep(short_time)
    await driver.findElement({ id: arg2 }).sendKeys(arg1);
});



Then("if the component {string} is on the page, the login has not yet occurred", async function (arg1) {
    await driver.sleep(short_time)
    await driver.findElement({ id: arg1 });
});

Given("I press the OK button on the pop-up", async function () {
    await driver.wait(until.alertIsPresent(), very_long_time);
    await driver.switchTo().alert().accept();
});

Then("if I'm on the page {string}, the login has not yet occurred", async function (arg1) {
    await driver.wait(until.urlIs(arg1), very_long_time);
});

Given("I create an email {string} and write in {string}", async function (arg1, arg2) {
    await driver.sleep(short_time);
    let randomnumber = Math.floor(Math.random() * 1000);
    let email = arg1 + "@gmail" + randomnumber + ".com";
    await driver.findElement({ id: arg2 }).sendKeys(email);
});









