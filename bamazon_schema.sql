DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45),
  department_name VARCHAR(25),
  price DECIMAL(5,2),
  stock_quantity INT(4),
  PRIMARY KEY(item_id)

);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Hunting bow,Sporting Goods,299,12);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Mountain bike,Sporting Goods,299,18);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Baseball bat,Sporting Goods,30,22);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Baseball helmet,Sporting Goods,25,12);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Bike helmet,Sporting Goods,25,7);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Backyard sprots bundle,Sporting Goods,110,5);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Nintendo Switch,Video Games,299,12);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Xbox,Video Games,299,19);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Playstation 4,Video Games,299,15);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Samsung 55inch,TV,299,8);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Kids T-shirts,Clothing,15,25);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Mens T-shirts,Clothing,18,25);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Womens T-shirts,Clothing,15,25);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES(Kids T-shirts,Clothing,15,25);
