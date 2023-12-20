const { By, until } = require("selenium-webdriver");

async function getByGenre(driver) {
  let inputGenre = await driver.findElement(By.id("genre_find"));
  await inputGenre.sendKeys("Rock");

  let submitButton = await driver.findElement(By.id("genreFindSubmit"));
  await submitButton.click();

  await driver.getCurrentUrl();

  let genreElements = await driver.wait(
    until.elementsLocated(
      By.css('tbody[ng-repeat="book in books"] td:nth-child(4)')
    ),
    5000
  );

  for (const elem of genreElements) {
    const text = await elem.getText();
    if (text !== "Rock") {
      throw new Error("Błąd pobierania danych z zadanego gatunku");
    }
  }
}

async function getById(driver) {
  let inputId = await driver.findElement(By.id("id_find"));
  await inputId.sendKeys("30");

  let submitButton = await driver.findElement(By.id("idFindSubmit"));
  await submitButton.click();

  await driver.getCurrentUrl();

  let idElements = await driver.wait(
    until.elementsLocated(
      By.css('tbody[ng-repeat="book in books"] td:nth-child(1)')
    ),
    10000
  );

  for (const elem of idElements) {
    const text = await elem.getText();
    if (idElements.length !== 1 || text !== "30") {
      throw new Error("Błąd pobierania danych z zadanego gatunku");
    }
  }
}

async function getByAuthor(driver) {
  let inputAuthor = await driver.findElement(By.id("author_find"));
  await inputAuthor.sendKeys("Klaudiusz Białkowski");

  let submitButton = await driver.findElement(By.id("authorFindSubmit"));
  await submitButton.click();

  await driver.getCurrentUrl();

  let authorElements = await driver.wait(
    until.elementsLocated(
      By.css('tbody[ng-repeat="book in books"] td:nth-child(3)')
    ),
    10000
  );

  for (let i = 0; i < authorElements.length; i++) {
    try {
      const freshAuthorElements = await driver.findElements(
        By.css('tbody[ng-repeat="book in books"] td:nth-child(3)')
      );

      const text = await freshAuthorElements[i].getText();

      if (text !== "Klaudiusz Białkowski") {
        throw new Error("Błąd pobierania danych z zadanego autora");
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);

      authorElements = await driver.findElements(
        By.css('tbody[ng-repeat="book in books"] td:nth-child(3)')
      );
    }
  }
}

module.exports = {
  getTests: { getByGenre, getByAuthor, getById },
};
