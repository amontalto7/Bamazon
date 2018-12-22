const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const log = console.log;
var Table = require("cli-table");

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
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Quit"
        ],
        name: "option"
      }
    ])
    .then(function(selection) {
      console.log(selection.option);
      switch (selection.option) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          addNewProduct();
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

let viewProducts = function() {
  // create table
  var table = new Table({
    head: [
      "item_id",
      "product_name",
      "department_name",
      "price",
      "stock_quantity"
    ],
    colWidths: [9, 50, 20, 10, 16]
  });

  //get all products
  let query =  "SELECT item_id, product_name, department_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    log(chalk.underline.bold.black.bgYellowBright("PRODUCTS"));
    for (var i = 0; i < res.length; i++) {
      // console.log(res[i].item_id + ".  " + res[i].product_name + " || " + res[i].department_name + " || " + chalk.green("$"+res[i].price.toFixed(2)));
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price.toFixed(2),
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    console.log("\n");
    // connection.end();
    displayOptions();
  });
};

let viewLowInventory = function() {
  var table = new Table({
    head: [
      "item_id",
      "product_name",
      "department_name",
      "price",
      "stock_quantity"
    ],
    colWidths: [9, 50, 20, 10, 16]
  });

  //get all products
  let query =
    "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    if (err) throw err;
    log(chalk.underline.bold.black.bgYellowBright("LOW INVENTORY"));
    for (var i = 0; i < res.length; i++) {
      // console.log(res[i].item_id + ".  " + res[i].product_name + " || " + res[i].department_name + " || " + chalk.green("$"+res[i].price.toFixed(2)));
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price.toFixed(2),
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    console.log("\n");
    // connection.end();
    displayOptions();
  });
};

let addToInventory = function() {
    // prompt user for item ID
  inquirer
    .prompt([
      {
        name: "choice",
        type: "input",
        message:
          "Please enter the ID of the product you'd like to modify, or 'B' to go back: "
      }
    ])
    .then(function(answer) {
        // if b , go back to menu
      if (answer.choice.toUpperCase() === "B") {
        return displayOptions();
      }
      // if user entered a valid number...
      if (isNaN(answer.choice) === false) {
          // query the item
        var query =  "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: parseInt(answer.choice) }, function(err,res) {
            // if item was found
            if (res[0]) {
                inquirer
                .prompt([
                    {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to add?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                        return true;
                        }
                        return false;
                    }
                    }
                ])
                .then(answer => {
                    let newQuantity =
                    parseInt(answer.quantity) + res[0].stock_quantity;

                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: res[0].item_id
                        }
                        ],
                        function(err, res) {
                        console.log(chalk.yellow("\n" + res.affectedRows + " product updated!"));
                        console.log(answer.quantity + " added to inventory. New stock_quantity: "+newQuantity+"\n");
                        // Call deleteProduct AFTER the UPDATE completes
                        displayOptions();
                        }
                    );

              });
          } else {
            log(chalk.red("Item not found."));
            displayOptions();
          }
          //   runSearch();
        });
      } else {
        log(chalk.red("Invalid format! Please enter a valid Product ID."));
        displayOptions();
      }
    });
};

let addNewProduct = function() {};
