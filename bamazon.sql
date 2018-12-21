DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name,price,stock_quantity)
VALUES
("Bamazon Echo","Bamazon Devices",19.99,500),
("Uncharted 4: A Thief's End","Video Games",59.99, 100),
("Cards Against Humanity","Toys & Games",25.00,269),
("Sapians","Books",15.79,300),
("Funko Pop Marvel: Thanos on Throne Collectible Figure, Multicolor","Toys & Games",40.55,2),
("Venom","Movies & TV",22.96,400),
("MySQL for Dummies","Books",30.00,60),
("Skinny Jeans with holes","Apparel",179.00,20),
("Hipster Sunglasses","Apparel",80.00,80),
("PS4 God Of War Bundle","Video Games",499.99,300),
("Chocolate covered Pretzels","Food & Drink", 15.00,600);

SELECT item_id, product_name, department_name, price, stock_quantity 
FROM products;

SELECT stock_quantity
FROM products
WHERE item_id = 10;

UPDATE products
SET stock_quantity = 10
WHERE item_id = 10;