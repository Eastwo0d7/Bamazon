# Bamazon

## Overview

My Bamazon app is designed as an Amazon-style marketplace where a customer can place an order for products in the Customer platform of the app, and the Manager can view and update inventory on the Manager platform of the app.

## Organization of code

The Bamazon Customer app (bamazonCustomer.js) has the dependencies at the top of the javascript, and next initializes the connection. Once the connection is completed, the function to buy an item is called. The rest of the code is the function definition of the 'buyItem' function, which uses Inquirer to prompt the user for the product ID and quantity they want, and processes the order if there is enough of the product in stock.
The Bamazon Manager app is designed with a 'start' function that is used to cycle through the actions available in the app, and prompt the user to choose an action. The rest of the code is defining the function for each of the actions available in the Manager app, which use Inquirer prompts and MySQL queries.

## Instructions on running the app
1. In Node, run: npm init
2. Run the following:
    npm install inquirer
    npm install mysql
3. To run the Customer app, type the following into Node: node bamazonCustomer.js.
    * Select a product to buy by typing the number ID at the prompt.
    * Choose the quantity of the product you wish to buy.
    * If there is enough inventory to complete your order, the inventory is updated and the final cost of the order is displayed.
4. To run the Manager app, type the following into Node: node bamazonManager.js.
    * To view the inventory for sale, select "View products for sale".
    * To view the products with less than 5 inventory remaining, select "View low inventory".
    * To add more stock to an existing product, select "Add to inventory".
        *When prompted, choose a product to update by its number ID, and the amount you wish to add to the stock quantity.
    * To add a new product, select "Add new product".
        *When prompted, choose a name, department, price, and stock quantity for your new product to create.

## Video of the app running
[Demo](Bamazon_demo.mp4)

## Technologies used
MySQL
Inquirer
Node

## Role in development of the app
My role was the principal developer of the application. I wrote all of the code, recorded the video of the app running, and executed the deployment of the app.