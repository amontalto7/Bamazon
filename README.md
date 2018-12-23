# Bamazon
CLI "Bamazon" storefront node app.

NPM packages used:
- [MySql](https://www.npmjs.com/package/mysql)  - used for database connection / manipulation
- [Inquirer](https://www.npmjs.com/package/inquirer)  - used to prompt user
- [Chalk](https://www.npmjs.com/package/chalk)  - used for styling / colors
- [CLI-Table](https://www.npmjs.com/package/cli-table) - used to display data in a table

Instructions: [https://columbia.bootcampcontent.com/columbia-bootcamp/COLNYC201809FSF2/blob/master/01_homework/week_12/homework_instructions.md](https://columbia.bootcampcontent.com/columbia-bootcamp/COLNYC201809FSF2/blob/master/01_homework/week_12/homework_instructions.md)

---
### 1) Customer View

usage:
> node bamazonCustomer.js

This will list all available products in the database, and allow the user to choose a product ID and an amount they'd like to purchase. Error handling is built in to accept valid input. If you attempt to purchase more of a product than is available in inventory, an error will be displayed with the available inventory.

![Bamazon Customer flow](/images/bamazonCustomer.gif)


If an item is sold out, it will no longer display:
![Bamazon no inventory](/images/bamazonCustomer1.gif)

---

### 2) Manager View

This will prompt the user with a list of available options:
- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product
- Quit

**View Products for Sale** and **View Low Inventory** will display results in a cli-table:
![View Products](/images/bamazonManager_viewInventory.gif)

**Add to Inventory** will allow a user to adjust the inventory for a chosen product:

![Add Inventory](/images/bamazonManager_addInventory.gif)

**Add New Product** will allow a user to add a new product:

![Add Product](/images/bamazonManager_addProduct.gif)
