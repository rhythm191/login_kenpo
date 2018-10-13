// auto login kanpo(my health web)
const puppeteer = require('puppeteer');

const login_url = 'https://its-kenpo.mhweb.jp/';

if (process.argv.length != 5) {
  console.log('USAGE: node index.js kigo bango password');
  return -1
}

const kigo = process.argv[2];
const bango = process.argv[3];
const password = process.argv[4];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(login_url);

  await page.type('#UserKigou', kigo);
  await page.type('#UserBangou', bango);
  await page.type('#UserPassword', password);

  await page.evaluate(({}) => {
    $('#UserIndexForm').submit();
  },{});

  await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});

  console.log('login success');

  await browser.close();
})();
