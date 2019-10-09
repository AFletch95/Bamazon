USE bamazon_db;

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT,
  department_name VARCHAR(45),
  over_head_cost INT(5),
  PRIMARY KEY(department_id)
);