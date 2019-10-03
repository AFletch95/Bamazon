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