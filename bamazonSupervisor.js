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

function displayOptions() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an option: ",
          choices: [
            "View Product Sales by Department",
            "Create New Department",
            "Quit"
          ],
          name: "option"
        }
      ])
      .then(function(selection) {
        console.log(selection.option);
        switch (selection.option) {
          case "View Product Sales by Department":
            viewProductSalesByDept();
            break;
          case "Create New Department":
            createNewDepartment();
            break;
          case "Quit":
            connection.end();
            process.exit();
            break;
          default:
            log(chalk.red("Oops, broken switch statement"));
        }
      });
  }

  function viewProductSalesByDept(){
    connection.end();
  }

  function createNewDepartment(){
    connection.end();
  }