#!/usr/bin/env node
"use strict";

var program = require("commander");

program
  .version("1.1.0")
  .command("setting", "setting login info")
  .command("login", "login my health web", { isDefault: true })
  .parse(process.argv);
