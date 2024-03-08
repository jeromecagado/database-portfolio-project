/* # Citation for the following function: app.js
   # Date: 02/29/2024
   # Copied from /OR/ Adapted from /OR/ Based on: CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main


// App.js

/*
    SETUP
*/
// Express setup
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9721;                 // Set a port number at the top so it's easy to change in the future


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// Handle Bars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/


// app.js

app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.


app.get('/developers', function(req, res)
{
    let query1 = "SELECT * FROM Developers;";

    db.pool.query(query1, function(error, rows, fields){
    
        res.render('developers', {data: rows});
    })
});



app.get('/customers', function(req, res)
{

    let query1 = "SELECT * FROM Customers;";

    db.pool.query(query1, function(error, rows, fields){
    
        res.render('customers', {data: rows});
    })
});

app.get('/sales', function(req, res)
{
    let query1 = "SELECT * FROM Sales"

    db.pool.query(query1, function(error,rows,fields){
        
        res.render('sales', {data: rows})
    })
});

app.get('/videogames', function(req, res)
{
    let query1 = "SELECT * FROM VideoGames"

    db.pool.query(query1, function(error,rows,fields){
        
        res.render('videogames', {data: rows})
    })
   
});

app.get('/videogamesales', function(req, res)
{
    let query1 = "SELECT * FROM VideoGameSales"

    db.pool.query(query1, function(error,rows, fields){
        
        res.render('vieogamesales', {data: rows})
    })
});

app.get('/employees', function(req, res)
{
    res.render('employees');
});

// app.js - ROUTES section
// Developer Routes
app.post('/add-developer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Developers (developer_name, developer_country, developer_email) VALUES ('${data.developer_name}', '${data.developer_country}', '${data.developer_email}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Developers.
            query2 = `SELECT * FROM Developers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-developer-ajax', function(req,res,next){
    let data = req.body;
    let developer_id = parseInt(data.developer_id);
    let deleteDeveloper= `DELETE FROM Developers WHERE developer_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteDeveloper, [developer_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
              }
  
  })});

// Customer route.
app.put('/put-developer-ajax', function(req,res,next){
    let data = req.body;
    let developer_id = data.developer_id;
    let developer_country = data.developer_country;
    let developer_email = data.developer_email;
  
    let queryUpdateDeveloper = `UPDATE Developers SET developer_country = ?, developer_email = ? WHERE developer_id = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateDeveloper, [developer_country, developer_email, developer_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log("Error updating developer:", error);
              res.sendStatus(400);
              } else {
                console.log("Developer udpated successfully");
                res.sendStatus(200);
                //res.send(rows);
              }
})});


app.post('/add-customer-ajax', function(req, res) 
{
    console.log("Reached add-customer-ajx route");
    console.log("Request body:", req.body);
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
  
    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customer_fname, customer_lname, address, city, state, zipcode, email, customer_phone) VALUES ('${data.customer_fname}', '${data.customer_lname}', '${data.address}', '${data.city}', '${data.state}', '${data.zipcode}', '${data.email}', '${data.customer_phone}')`;
    db.pool.query(query1, function(error, rows, fields){
  
        // Check to see if there was an error
        if (error) {
  
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Developers.
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){
  
                // If there was an error on the second query, send a 400
                if (error) {
                      
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
  
  
app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let customer_id = parseInt(data.customer_id);
    let deleteCustomer= `DELETE FROM Customers WHERE customer_id = ?`;
    
    
        // Run the 1st query
        db.pool.query(deleteCustomer, [customer_id], function(error, rows, fields){
            if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
    
})});
  
app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
    let customer_id = data.customer_id;
    let customer_city = data.city;
    let customer_state = data.state;
    
    let queryUpdateCustomer = `UPDATE Customers SET developer_state = ?, developer_email = ? WHERE customer_id = ?`;
    
        // Run the 1st query
        db.pool.query(queryUpdateCustomer, [customer_city, customer_state, customer_id], function(error, rows, fields){
            if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log("Error updating customer:", error);
            res.sendStatus(400);
            } else {
                console.log("Customer udpated successfully");
                res.sendStatus(200);
                //res.send(rows);
            }
})});






/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});