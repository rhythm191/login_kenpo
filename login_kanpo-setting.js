// setting kanpo(my health web)
'use strict';

const inquirer = require('inquirer');
const fs = require("fs");

const path = require("path");
const userHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];


const questions = [
  {
    type: "input",
    name: "kigo",
    message: "kigo:",
  },
  {
    type: "input",
    name: "bango",
    message: "bango:",
  },
  {
    type: "password",
    name: "password",
    message: "password:",
  }
];

inquirer.prompt(questions).then(function(answer) {
  fs.writeFileSync(path.join(userHome, '.login_kanpo_env.json'), JSON.stringify(answer));
});
