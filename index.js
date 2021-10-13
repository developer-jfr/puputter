const puppeteer = require('puppeteer');
const fs = require('fs');
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto("https://www.crunchbase.com/person/aaron-levie");
   
    const result = await page.evaluate(() => {
        let name = document.querySelector('div[class="identifier-nav-title ng-star-inserted"] > h1').innerText;
        let location = document.querySelector('span[class="component--field-formatter field-type-text_short ng-star-inserted"]').innerText;
        let image = document.querySelector('div[class="provide-styling cb-image-with-placeholder"] > img ').src;
        let description = document.querySelector('span[class="description has-overflow"] > p').innerText;
        return {
          name,
          location,
          image,
          description
        }

    });

    browser.close();
    return result;
};

scrape().then((value) => {
  fs.writeFile('./db.json', JSON.stringify(value), err => err ? console.log(err): null);
    console.log(value); // Получилось!
});