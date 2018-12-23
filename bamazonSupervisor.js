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

function viewProductSalesByDept() {
  // create table
  var table = new Table({
    head: [
      "department_id",
      "department_name",
      "over_head_costs",
      "product_sales",
      "total_profit"
    ],
    colWidths: [15, 30, 20, 20, 20]
  });

  //get all products
  let query =
    "SELECT d.department_id, d.department_name, d.over_head_costs, IFNULL(sum(p.product_sales),0) as 'product_sales', (IFNULL(sum(p.product_sales),0) - d.over_head_costs) as 'total_profit'" 
    + " FROM departments d" 
    + " LEFT JOIN products p"
    + " ON d.department_name = p.department_name"
    + " GROUP BY department_name"
    + " ORDER BY department_name";
    
console.log(query);

  connection.query(query, function(err, res) {
    if (err) throw err;
    log(chalk.underline.bold.black.bgYellowBright("\nPRODUCT SALES\n"));
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].department_id,
        res[i].department_name,
        "$" + res[i].over_head_costs.toFixed(2),
        "$" + res[i].product_sales.toFixed(2),
        "$" + res[i].total_profit.toFixed(2),
      ]);
    }
    console.log(table.toString());
    console.log("\n");
    displayOptions();
  });
}

function createNewDepartment() {
  connection.end();
}
