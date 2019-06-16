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
    buyItem();
});

function buyItem() {
    inquirer.prompt([
    {
        type: "input",
        name: "item_id",
        message: "What is the ID of the product you wish to buy?"
    }, 
    {
        type: "input",
        name: "order_quantity",
        message: "How many would you like to buy?"
    }
    ]).then(function(answer) {
    var searchedProduct = parseInt(answer.item_id);
    var query = "SELECT * FROM products WHERE item_id = ?";
    connection.query(query, [searchedProduct], function(err, res) {
        if (err) throw err;
        var orderPrice;
        var orderQuantity;
        var orderCost; 
        for (var i = 0; i < res.length; i++) {
            searchedProduct = res[i];
            orderPrice = parseInt(res[i].price);
            orderQuantity = parseInt(answer.order_quantity);
            orderCost = orderPrice * orderQuantity;
            if (searchedProduct.stock_quantity > answer.order_quantity){
                connection.query("UPDATE products SET ? WHERE ?",
                [{stock_quantity: (searchedProduct.stock_quantity - answer.order_quantity)},{item_id: searchedProduct.item_id}], 
                function(err){
                    if (err) throw err;
                    console.log("Your order was processed successfully!");
                    console.log("Order cost: " + "$" + orderCost);
                }
                )} else {
                    console.log("Not enough in stock");
                }
        }
        connection.end();
    });
});
}