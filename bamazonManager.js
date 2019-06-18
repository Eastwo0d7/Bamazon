var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Eddie10!",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    start();
});

function start(){
    inquirer
        .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View products for sale",
            "View low inventory",
            "Add to inventory",
            "Add new product",
            "exit"
        ]
        })
        .then(function(answer) {
        switch (answer.action) {
        case "View products for sale":
            productSearch();
            break;
    
        case "View low inventory":
            viewLowInventory();
            break;
    
        case "Add to inventory":
            addInventory();
            break;
    
        case "Add new product":
            addProduct();
            break;
    
        case "exit":
            connection.end();
            break;
        }
    });
}

function productSearch(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + "$" + res[i].price + " || Quantity left: " + res[i].stock_quantity);
      }
      start();
    });
}

function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity<=5";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + "$" + res[i].price + " || Quantity left: " + res[i].stock_quantity);
      }
      start();
    });
}

function addInventory(){
    inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "What product would you like to update?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity_added",
        type: "input",
        message: "How many would you like to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        var updatedProduct = answer.item_id;
        var totalAdded = parseInt(answer.quantity_added);
        var query = 'SELECT * FROM products WHERE ?';
        connection.query(query, {item_id: updatedProduct}, function(err, res) {
        if (err) throw err;
        var productQuantity = parseInt(res[0].stock_quantity);
        var updateStock = 'UPDATE products SET stock_quantity = ' + (productQuantity + totalAdded) + ' WHERE item_id = ' + updatedProduct;
        connection.query(updateStock, function(err, res) {
            if (err) throw err;
            console.log("Stock Quantity for item_id " + updatedProduct + " is now " + (productQuantity + totalAdded));
        start();
      });
    });
})
}