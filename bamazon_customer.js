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
 
  console.log('connected as id ' + connection.threadId);
});

function displayAllItems(){
  let query = "SELECT * FROM products"
  connection.query(query,function(err,data){
    if(err) throw err;

    console.log("\n\n============ Avaliable Items ============\n")
    for(let i=0;i<data.length;i++){
      console.log("ID#"+data[i].item_id+", "+data[i].product_name+", "+data[i].department_name+" $"+data[i].price+", "+data[i].stock_quantity+" in stock.\n" )
    }
    console.log("\n=========================================\n")
    buyItem()
  })
  
  // connection.end();
}
function buyItem() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'itemID',
      message: 'Enter the item ID number for the item you would like to purchase.'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like to purchase?'
    }
  ]).then(function(response) {
    let buyingID = response.itemID;
    let buyingQuantity = response.quantity;

    //Search DB for items
    //Check if quantity is avaliable
    //if false display error
    //if true remove quantity from DB
    buyItem_mySql(buyingID,buyingQuantity)

  })
}
function updateItem(id,quan) {
  query = "UPDATE products SET stock_quantity=stock_quantity-? WHERE item_id=?";
  connection.query(query,[quan,id],function(err,data){
    if(err) throw err;

    console.log("After",data)
  })

}

function buyItem_mySql(itemID,quantity) {
  let flag_quantity = true;
  let query = "SELECT * FROM products WHERE item_ID=?";
  connection.query(query,[itemID],function(err,data){
    if(err) throw err;
    console.log("Before",data)

    //Check to see if wanted quantity is avaliable
    if(data[0].stock_quantity<quantity){
      console.log("We don't have enough in stock!");
      flag_quantity = false;
    }
    if(flag_quantity){ //updateItem(itemID,quantity);
      query = "UPDATE products SET stock_quantity=stock_quantity-? WHERE item_id=?";
      connection.query(query,[quantity,itemID],function(err,data){
        if(err) throw err;
    
        console.log("After",data)
        connection.end();
      })
    }
  })

}


displayAllItems()
console.log("***************************************")
