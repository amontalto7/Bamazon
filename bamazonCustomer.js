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
    // get all products with a quantity greater than 0
    let query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity > 0;"
    connection.query(query, function(err, res) {
        if (err) throw err;
        log(chalk.underline.bold.black.bgYellowBright('PRODUCTS'));
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ".  " + res[i].product_name + " || " + res[i].department_name + " || " + chalk.green("$"+res[i].price.toFixed(2)));
        }
        console.log("\n");
        chooseProduct(res);

      });
}

let chooseProduct = function(res){
        inquirer
          .prompt([
            {
              name: "choice",
              type: "input",
              message: "Please enter the ID of the product you would like to purchase, or 'Q' to quit: ",
            }
          ])
          .then(function(answer) {

            if (answer.choice.toUpperCase() === "Q")
                {
                    connection.end();
                    process.exit();
                }

            let found = false;
            let resIndex = "";
            for (var i = 0; i < res.length; i++){
                if (res[i].item_id === parseInt(answer.choice)){
                    found = true;
                    resIndex = i;   // store index of query result for later use 
                }
            }

            if (found) {

                inquirer
                .prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many? ",
                    validate: function(value) {
                      if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
                })
                .then(function(answer) {

                   if (answer.quantity <= res[resIndex].stock_quantity) {
                    buyStuff(res[resIndex], parseInt(answer.quantity));
                    } else {
                    log(chalk.red("Insufficient Inventory! Max quantity: "+res[resIndex].stock_quantity));
                    chooseProduct(res);
                }
                });

               } else {
                log(chalk.red("Product not found!"));
                chooseProduct(res);
               }
        });
      
}

var buyStuff = function(item, purchaseQuantity) {
    let updatedQuantity = item.stock_quantity - purchaseQuantity;
 
     connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: updatedQuantity
          },
          {
            item_id: item.item_id
          }
        ],
        function(error) {
          if (error) throw error;
          console.log("\nOrder placed successfully!");
          let totalCost = item.price * purchaseQuantity;
          log(chalk.yellow(purchaseQuantity) + chalk.blue(" order(s) of '" + item.product_name +"' purchased for a total of ") + chalk.green.bold("$"+totalCost.toFixed(2)+"\n"))

          displayProducts();
        }
      );
}