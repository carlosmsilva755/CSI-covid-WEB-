const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { driver } = require('../support/web_driver');
const { Builder,By,Keys,Key, until } = require('selenium-webdriver');

const path = require('path');

//// Your step definitions /////

const short_time = 1000
const long_time = 5000
const very_long_time = 40000
var codigo_salvo 
var codigo_deletado
var value_salvo2

Given(/^Browse to web site "([^"]*)"$/, async function (url) {
    await driver.get(url);
});

Given("I press the {string}", async function (arg1) {
    await driver.sleep(short_time)
    await driver.wait(until.elementLocated(By.id(arg1)), very_long_time);
    await driver.findElement({ id: arg1 }).click();
    
});

Given("I press the {string}  and choose the file", async function (arg1) {
    const image = path.join(__dirname, '..', '..', 'sumples', 'Raio_X.jpg');

    await driver.sleep(short_time)
    await driver.findElement({ id: "input-file" })
        .sendKeys(image);
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
    await driver.sleep(short_time)  
    
});

When("I see {string} written on the requested page", async function (arg1) {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div/div/div[2]/p[1]')), very_long_time);
    const text = await driver.findElement({ xpath:'//*[@id="root"]/div/div/div/div/div[2]/p[1]' }).getText();
    console.log(text)
    assert.equal(arg1, text) 

});

When("I see {string} written on the requested page:xpath{string}", async function (arg1, arg2) {
    await driver.sleep(short_time)
    await driver.wait(until.elementLocated(By.xpath(arg2)), very_long_time);
    const text = await driver.findElement({ xpath: arg2 }).getText();
    console.log(text)
    assert.equal(arg1, text) 
    
});

 Given("I enter {string} in {string}", async function (arg1, arg2) {
    await driver.sleep(short_time)
    await driver.findElement({ id: arg2 })
    await driver.findElement({ id: arg2 }).sendKeys(arg1);
     await driver.sleep(long_time)
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
    let email = arg1 + randomnumber +"@gmail" +  ".com";
    await driver.findElement({ id: arg2 }).sendKeys(email);
});

Given("I see {string} written on the requested page.id:{string}", async function (arg1, arg2) {
    await driver.wait(until.elementLocated(By.id(arg2)), very_long_time);
    const text = await driver.findElement({ id: arg2 }).getText();
    console.log(text)
    assert.equal(arg1, text)
    await driver.sleep(short_time)
});

Given("I see {string} written on the requested page.css:{string}", async function (arg1, arg2) {
    await driver.wait(until.elementLocated(By.css(arg2)), very_long_time);
    const text = await driver.findElement({ css: arg2 }).getText();
    console.log(text)
    assert.equal(arg1, text)
});

Given("I press the {string}css", async function (arg1) {
    await driver.wait(until.elementLocated(By.css(arg1)), very_long_time);
    await driver.findElement({ css: arg1 }).click();

});

Given("I see the diagnostic code{string}and save it", async function (arg1) {

    var nova_Tela = await driver.findElement({ className: arg1 }).getText().then((codigo_salvo2) => {
        console.log(codigo_salvo2)
        codigo_salvo = codigo_salvo2
        
    })
});



Given("I see {string}", async function (arg1) {
    console.log(codigo_salvo)
});





Then("I check if the code has been deleted which is the same as {string}", async function (arg1) {
    await driver.sleep(short_time)
    await driver.findElement({ id: "pesquisar-input" }).sendKeys(codigo_salvo);
    await driver.sleep(short_time)
    await driver.findElement({ id: "pesquisar-button" }).click();
    await driver.sleep(short_time)
    await driver.findElement({ id: "pesquisar-input-label" }).getText().then((codigo_deletado2) => {
        console.log(codigo_deletado2)
        codigo_deletado = codigo_deletado2

    })

    await driver.sleep(short_time)
    assert.equal(arg1, codigo_deletado) 
});

Given("I check the diagnostic code unless it starts with the letter {string}", async function (arg1) {
console.log(arg1," ----- Começo do codigo que passei!")
resultado = codigo_salvo.substring(0,1)
console.log(resultado, " ----- Começo do codigo que encontrei!")
assert.equal(arg1, resultado) 
});


Given("I see {string} written on the requested pagecc.id:{string}", async function (arg1, arg2) {
    await driver.sleep(short_time)
    await driver.wait(until.elementLocated(By.id(arg2)), very_long_time);
    const text = await driver.findElement({ id: arg2 }).getAttribute("value");
    console.log(text)
    assert.equal(arg1, text)
});



Given("I save the value of the diagnostic input fields:{string}, {string},{string},{string} , {string} ,{string}and {string}", async function (arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    await driver.wait(until.elementLocated(By.id(arg2)), very_long_time);
    const text = await driver.findElement({ id: arg2 }).getText();
    console.log(text)
    assert.equal(arg1, text)
});

Given("I clear the field {string}", async function (arg1) {
    await driver.sleep(short_time)
    await driver.clearValue({ id: arg1 });

});
    


Given("I save the value of the information in a variable.id{string}", async function (arg1) {
    await driver.wait(until.elementLocated(By.id(arg1)), very_long_time);
    var nova_Tela = await driver.findElement({ id: arg1 }).getAttribute("value").then((value_salvo1) => {
        console.log(value_salvo1)
        value_salvo2 = value_salvo1
    })
});


Given("I enter the value saved in {string}", async function (arg1) {
    await driver.wait(until.elementLocated(By.id(arg1)), very_long_time);
   await driver.sleep(short_time)
    await driver.findElement({ id: arg1 }).sendKeys(value_salvo2);
});

// Given("I enter {string} in {string} and I enter {string} in {string} and click{string}",  function (arg1, arg2,arg3,arg4,arg5) {
    
//        // JavaScript.window.location.reload()
//     var document.getElementById('entrar-button').innerHTML = '<button id="entrar-button" class="button less-mrgtop" type="submit" enable="">Entrar</button>'
//      driver.findElement({ id: arg2 }).sendKeys(arg1);
//      driver.findElement({ id: arg5 }).click();
//     driver.findElement({ id: arg4 }).sendKeys(arg3);
//      driver.findElement({ id: arg5 }).click();
// });


Given("I clear and enter {string} in {string}", async function (arg1, arg2) {
    let searchInput = driver.findElement(By.id(arg2));
    // driver.sendKeys(Keys.BACK_SPACE); //do repeatedly, e.g. in while loop
    // await driver.actions().keyDown(Key.BACK_SPACE).perform();/

    await driver.actions().keyDown(Key.CONTROL).sendKeys('a').perform();
    await driver.sleep(short_time)
    await driver.findElement({ id: arg2 }).sendKeys(arg1);
    await driver.actions().keyDown(Key.BACK_SPACE).perform();
    await driver.findElement({ id: arg2 }).sendKeys(arg1);

    // await driver.findElement({ id: arg2 }).sendKeys(arg1);
    // await driver.actions().keyDown(Key.BACK_SPACE).sendKeys(arg1).perform();
    // await driver.sleep(short_time)
    // await driver.findElement({ id: arg2 }).sendKeys(arg1);
    await driver.sleep(long_time)
   
    
 
   });