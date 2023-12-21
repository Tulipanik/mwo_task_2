const { Builder, By, Key, until } = require("selenium-webdriver");
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
require("chromedriver");

const { getTests } = require("./getTests");
const { updateTests } = require("./updateTests");
const { deleteTests } = require("./deleteTests");

async function runTests() {
  // let driver = await env
  // .builder()
  // .setChromeOptions(options.addArguments('--headless=new'))
  // .build();
  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options.addArguments('--headless')).build();

  try {
    await driver.get(
      "http://127.0.0.1:8080/frontend/content/Viewer/login.html"
    );

    await login(driver);

    await driver.sleep(500);

    await driver.getCurrentUrl();
    let getButton = await driver.findElement(By.id("getMenu"));
    await getButton.click();

    await driver.sleep(500);

    await getTests.getByGenre(driver);
    await getTests.getById(driver);
    await getTests.getByAuthor(driver);

    let updateButton = await driver.findElement(By.id("editMenu"));
    await updateButton.click();
    await driver.sleep(500);

    let moveToRight = await driver.findElement(By.id("nextPage"));

    for (var i = 0; i < 10; i++) {
      await moveToRight.click();
    }

    let moveToLeft = await driver.findElement(By.id("previousPage"));

    await updateTests.createBook(driver);

    for (var i = 0; i < 10; i++) {
      let moveToLeft = await driver.findElement(By.id("previousPage"));
      await moveToLeft.click();
    }

    updateButton = await driver.findElement(By.id("editMenu"));
    await updateButton.click();

    await updateTests.updateBook(driver);

    await driver.sleep(500);

    await driver.getCurrentUrl();

    let deleteButton = await driver.findElement(By.id("deleteMenu"));
    await deleteButton.click();
    await driver.sleep(500);

    await deleteTests.deleteById(driver);

    await driver.navigate().to(await driver.getCurrentUrl());
    deleteButton = await driver.findElement(By.css("#deleteMenu"));
    await deleteButton.click();

    await deleteTests.deleteByGenre(driver);

    deleteButton = await driver.findElement(By.css("#deleteMenu"));
    await deleteButton.click();

    await deleteTests.deleteAll(driver, moveToLeft);

    await driver.quit();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function login(driver) {
  let inputUsername = await driver.findElement(By.id("username"));
  await inputUsername.sendKeys(process.env.ADMINNAME);

  let inputPassword = await driver.findElement(By.id("password"));
  await inputPassword.sendKeys(process.env.PASSWORD);

  let button = await driver.findElement(By.id("login"));
  button.click();
}

runTests();
