const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();
const MySqlUser = require("./mySql_user.js");

let my_username = MySqlUser.user.username;
let my_password = MySqlUser.user.password;

// Setup connection to mySql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : my_username,
  password : my_password,
  database : 'bamazon_db'
});
// Establish connection
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId,'\n\n');
  mainMenu();
});


function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      choices: ['View all products','View low inventory','Add to inventory','Add new product','Quit']
    }
  ]).then(function(user) {
    switch (user.choice){
      case 'View all products':
        displayAllItems();
        break;
      case 'View low inventory':
        viewLowInventory();
        break;
      case 'Add to inventory':
        increaseInventory();
        break;
      case 'Add new product':
          addNewProduct_inquirer();
        break;
      case 'Quit':
        connection.end();
        break;

    }
  })
  
}

function displayAllItems(){
  let query = "SELECT * FROM products"
  connection.query(query,function(err,data){
    if(err) throw err;

    console.log("\n\n============ Avaliable Items ============\n")
    for(let i=0;i<data.length;i++){
      console.log("ID#"+data[i].item_id+", "+data[i].product_name+", "+data[i].department_name+" $"+data[i].price+", "+data[i].stock_quantity+" in stock.\n" )
    }
    console.log("\n=========================================\n")
    mainMenu();
  })
  
}

function viewLowInventory() {
  let query = "SELECT * FROM products WHERE stock_quantity<5"
  connection.query(query,function(err,data){
    if(err) throw err;
    if(data.length==0) console.log("No Low items!")

    else{
      console.log("\n\n============ Avaliable Items ============\n")
      for(let i=0;i<data.length;i++){
        console.log("ID#"+data[i].item_id+", "+data[i].product_name+", "+data[i].department_name+" $"+data[i].price+", "+data[i].stock_quantity+" in stock.\n" )
      }
      console.log("\n=========================================\n")
    }
    mainMenu();
  })
}

function increaseInventory() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'idNumber',
      message: 'Type the item ID you would like to increase stock'
    },
    {
      type: 'input',
      message: 'How many would you like to increase the stock by?',
      name: 'stockToAdd'
    }
  ]).then(function(user) {
    var query = "SELECT * FROM products WHERE item_id=?";
    connection.query(query,[user.idNumber],function(err,data){
      if(err) throw err;
      if(data.length==0) console.log('ID not found!');
      else{
        query = "UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?";
        connection.query(query,[user.stockToAdd,user.idNumber],function(err,data){
          if(err) throw err;
          console.log('\nStock updated\n')
          mainMenu();
        })
      }
    })    
  })
}

function addNewProduct_inquirer(){
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the product's name?",
      name: 'name'
    },
    {
      type: 'input',
      message: "What is the product's department?",
      name: 'department'
    },
    {
      type: 'input',
      message: "What is the product's price?",
      name: 'price'
    },
    {
      type: 'input',
      message: "How many are in stock?",
      name: 'stock'
    }
  ]).then(function(user){
    addProductToDatabase(user.name,user.department,user.price,user.stock);
  })
}
function addProductToDatabase(name,department,price,stock){
  var query = "INSERT INTO products(product_name,department_name,price,stock_quantity)"+
                "VALUES(?,?,?,?);"
  connection.query(query,[name,department,price,stock],function(err,data){
    if(err) throw err;
    console.log("New product added!");
    mainMenu();
  })
}