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

INSERT INTO departments(department_name, over_head_costs)
VALUES
("Bamazon Devices",200.00),
("Video Games",1000.00),
("Toys & Games",345.62),
("Books",200.00),
("Movies & TV",600.00),
("Apparel",400.00),
("Food & Drink",250.27),
("Automotive",0.00),
("Sports",300.00);

SELECT department_id, department_name, over_head_costs 
FROM departments;

-- SELECT d.department_id, d.department_name, d.over_head_costs, IFNULL(sum(p.product_sales),0) as 'product_sales', (IFNULL(sum(p.product_sales),0) - d.over_head_costs) as 'total_profit'
-- FROM departments d 
-- LEFT JOIN products p
-- ON d.department_name = p.department_name
-- GROUP BY department_name
-- ORDER BY department_name;