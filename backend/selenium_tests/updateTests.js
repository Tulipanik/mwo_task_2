const { By, until } = require("selenium-webdriver");

async function createBook(driver) {
  await driver.sleep(500);

  const inputTitle = await driver.findElement(By.id("title"));
  await inputTitle.sendKeys("Title");

  const inputAuthor = await driver.findElement(By.id("author"));
  await inputAuthor.sendKeys("Grzegorz");

  const inputGenre = await driver.findElement(By.id("genre"));
  await inputGenre.sendKeys("Test");

  const submitButton = await driver.findElement(By.id("add_submit"));
  await submitButton.click();

  await driver.navigate().to(await driver.getCurrentUrl());

  let moveToRight = await driver.findElement(
    By.css('#control button[ng-click="next()"]')
  );

  for (let i = 0; i < 10; i++) {
    await moveToRight.click();
  }

  await driver.wait(async () => {
    try {
      const titleElement = await driver.findElement(
        By.xpath('//*[contains(text(), "Title")]')
      );
      const authorElement = await driver.findElement(
        By.xpath('//*[contains(text(), "Grzegorz")]')
      );
      const genreElement = await driver.findElement(
        By.xpath('//*[contains(text(), "Test")]')
      );

      return titleElement && authorElement && genreElement;
    } catch (error) {
      throw new Error("book not added");
    }
  }, 5000);
}

module.exports = {
  createBook,
};

async function updateBook(driver) {
  let inputId = await driver.findElement(
    By.css('input[ng-model="bookToUpdate.id"]')
  );
  await inputId.sendKeys("1");

  let inputTitle = await driver.findElement(
    By.css('input[ng-model="bookToUpdate.title"]')
  );
  await inputTitle.sendKeys("Siema");

  let inputAuthor = await driver.findElement(
    By.css('input[ng-model="bookToUpdate.author"]')
  );
  await inputAuthor.sendKeys("to");

  let inputGenre = await driver.findElement(
    By.css('input[ng-model="bookToUpdate.genre"]')
  );
  await inputGenre.sendKeys("ja");

  let submitButton = await driver.findElement(By.id("update_submit"));
  await submitButton.click();

  await driver.getCurrentUrl();

  await driver.wait(async () => {
    try {
      let titleElement = await driver.wait(
        until.elementLocated(By.xpath('//*[contains(text(), "Siema")]')),
        5000
      );
      let authorElement = await driver.wait(
        until.elementLocated(By.xpath('//*[contains(text(), "to")]')),
        5000
      );
      let genreElement = await driver.wait(
        until.elementLocated(By.xpath('//*[contains(text(), "ja")]')),
        5000
      );

      return titleElement && authorElement && genreElement;
    } catch (error) {
      throw new Error("book not updated");
    }
  }, 5000);
}

module.exports = {
  updateTests: {
    createBook,
    updateBook,
  },
};
