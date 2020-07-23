const { Given, When, Then } = require('cucumber');
const { TestModel, Auto } = require('leanpro.win');
const { Util } = require('leanpro.common');
const assert = require('assert');
const { driver } = require('../support/web_driver');
let model = TestModel.loadModel(__dirname + "/model1.tmodel");


//// Your step definitions /////


const short_time = 1000
const long_time = 5000

Given(/^Browse to web site "([^"]*)"$/, async function (url) {
    await driver.get(url);
});

Given("I press the {string}", async function (arg1) {
    await driver.sleep(long_time)
    await driver.findElement({ id: arg1 }).click();
   
});

Given("I press the {string} option e escolher o arquivo", async function (arg1) {
    //C:/Users/Ray/Desktop/Repositorio_COVID/frontweb/Test/sumples/Raio_X.png
    await driver.sleep(short_time)
    await driver.findElement({ id: "input-file" }).sendKeys("C:/Users/Ray/Desktop/Repositorio_COVID/frontweb/Test/sumples/Raio_X.png");
    await driver.sleep(short_time)
});

Given("I press the windows {string}", async function (arg1) {
    await model.getList("Modo de Exibição de Itens").click(0, 0, 1);

});

Given("I press the windows-list {string}", async function (arg1) {
   
    

    await model.getListItem(arg1).click(0, 0, 1);

});

Given("I press the windows-Image {string}", async function (arg1) {

  await model.getImage(arg1).click(0, 0, 1);

});

Then("I press the windows-Button {string}", async function (arg1) {

    await model.getButton(arg1).click(0, 0, 1);
});

Given("I press the windows-menu {string}", async function (arg1) {

    await model.getTreeItem(arg1).click(0, 0, 1);
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
    await driver.findElement({ css: arg1 }).click();
    
});

When("Eu vejo algo", async function () {
    await driver.sleep(short_time)
    const text = await driver.findElement({ xpath: '//*[@id="root"]/div/div/div/div/div[2]/p[1]/b' }).getText();
    console.log(text)
    assert.equal('PENDENTE',text)
});



