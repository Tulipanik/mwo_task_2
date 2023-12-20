const { By, until, logging } = require("selenium-webdriver");

async function deleteById(driver) {
  let idInput = await driver.findElement(By.id("id"));
  await idInput.sendKeys("1");

  let deleteIdButton = await driver.findElement(By.id("deleteId"));
  await deleteIdButton.click();

  await driver.getCurrentUrl();

  let idElements = await driver.wait(
    until.elementsLocated(
      By.css('tbody[ng-repeat="book in books"] td:nth-child(1)')
    ),
    5000
  );

  await idElements[0].getText().then((id) => {
    if (id === 1) {
      throw new Error("Element with id 1 is not deleted");
    }
  });
}

async function deleteByGenre(driver) {
  let genreInput = await driver.findElement(By.id("genre_delete"));
  await genreInput.sendKeys("Rock");

  let deleteGenreButton = await driver.findElement(By.id("deleteGenre"));
  await deleteGenreButton.click();

  await driver.navigate().to(await driver.getCurrentUrl());

  const updateButton = await driver.wait(
    until.elementLocated(By.css('button[id="getMenu"]')),
    5000
  );

  await driver.sleep(1000);
  updateButton.click();

  let genreGetInput = await driver.findElement(By.id("genre_find"));
  await genreGetInput.sendKeys("Rock");

  let genreGetButton = await driver.findElement(By.id("genreFindSubmit"));
  await genreGetButton.click();

  await driver.getCurrentUrl();

  await driver.wait(
    until.elementLocated(
      By.xpath('//*[contains(text(), "no book with such genre")]')
    ),
    5000
  );
}

async function deleteAll(driver) {
  let deleteAllButton = await driver.findElement(By.id("deleteAll"));
  await deleteAllButton.click();

  await driver.getCurrentUrl();
  await driver.navigate().to(await driver.getCurrentUrl());

  try {
    await driver.wait(
      until.elementsLocated(
        By.css('tbody[ng-repeat="book in books"] td:nth-child(1)')
      ),
      5000
    );
    throw new Error("Data was not deleted!");
  } catch (err) {}
}

module.exports = {
  deleteTests: {
    deleteById,
    deleteByGenre,
    deleteAll,
  },
};
