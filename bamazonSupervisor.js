const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const log = console.log;
const Table = require("cli-table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayOptions();
});