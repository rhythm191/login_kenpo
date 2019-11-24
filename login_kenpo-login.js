// auto login kenpo(my health web)
"use strict";

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const userHome =
  process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];

fs.access(path.join(userHome, ".login_kenpo_env.json"), function(err) {
  if (err) {
    console.log("execute `login_kenpo setting`");
    process.exit();
  }
});

var setting = require(path.join(userHome, ".login_kenpo_env.json"));

const login_url = "https://its-kenpo.mhweb.jp/";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(login_url);

  await page.type("#UserKigou", setting.kigo);
  await page.type("#UserBangou", setting.bango);
  await page.type("#UserPassword", setting.password);

  await page.evaluate(({}) => {
    $("#UserIndexForm").submit();
  }, {});

  await page.waitForNavigation({
    timeout: 60000,
    waitUntil: "domcontentloaded"
  });

  const point = await page.evaluate(
    () => document.getElementById("p_left").innerText
  );

  console.log(`login success! your point is ${point}`);

  await browser.close();
})();
