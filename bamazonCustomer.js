const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const log = console.log;

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
    displayProducts();
    
});

let displayProducts = function() {
    let query = "SELECT item_id, product_name, department_name, price, stock_quantity from products;"
    connection.query(query, function(err, res) {
        if (err) throw err;
        log(chalk.underline.bold.black.bgYellowBright('PRODUCTS'));
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ".  " + res[i].product_name + " || " + res[i].department_name + " || " + chalk.green("$"+res[i].price.toFixed(2)));
        }
        console.log("\n");
        chooseProduct();

      });
}

let chooseProduct = function(){
        inquirer
          .prompt([
            {
              name: "item_id",
              type: "input",
              message: "Please enter the ID of the product you would like to purchase: ",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
              name: "quantity",
              type: "input",
              message: "How many? ",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
          .then(function(answer) {
            connection.query(
                "SELECT stock_quantity FROM products WHERE ?",
                  {
                    item_id: answer.item_id
                  }
                ,
                function(error,res) {
                  if (error) throw err;

                  if (!res[0]) {
                      console.log("Product not found!")
                      chooseProduct();
                     } else {
                        //  console.log((answer.quantity <= res[0].stock_quantity) ? "enough" : "not enough")
                        if (answer.quantity <= res[0].stock_quantity) {
                            buyStuff();
                        } else {
                            log(chalk.red("Insufficient Inventory! Max quantity: "+res[0].stock_quantity));
                            chooseProduct();
                        }
                    }
                  //   start();
                }
              );

            console.log("Item: " + answer.item_id);
            console.log("Quantity: " + answer.quantity);
        });
      
}

var buyStuff = function(item_id) {
    connection.end();

}