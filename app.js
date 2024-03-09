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

app.get('/videogames', function(req, res)
{
    let query1 = "SELECT * FROM VideoGames;";

    db.pool.query(query1, function(error,rows,fields){
        
        res.render('videogames', {data: rows})
    })

    
});

app.get('/sales', function(req, res)
{

    let query1 = "SELECT * FROM Sales"
    db.pool.query(query1, function(error,rows,fields){

        let query2 = "SELECT employee_id, employee_fname, employee_lname FROM Employees";

        db.pool.query(query2,function(error,employeesData,fields){
            

            let query3 = "SELECT customer_id,customer_fname,customer_lname FROM Customers";

            db.pool.query(query3,function(error,customerData,fields){
                res.render('sales', {data: rows,employees:employeesData,customers: customerData})
            })
        })
    })
})
;

app.get('/videogamesales', function(req, res)
{
    let query1 = "SELECT * FROM VideoGameSales;";

    db.pool.query(query1, function(error,rows, fields){
        
        res.render('vieogamesales', {data: rows})
    })
});

app.get('/employees', function(req, res)
{
    let query1 = "SELECT * FROM Employees"
    db.pool.query(query1, function(error,rows,fields){
        
        res.render('employees', {data: rows})
    })



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


// Customer Route
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
    let customer_address = data.customer_address;
    let customer_city = data.customer_city;
    let customer_state = data.customer_state;
    let customer_zipcode = data.customer_zipcode;
    let customer_email = data.customer_email;
    let customer_phone = data.customer_phone;
    
      
    let queryUpdateCustomer = `UPDATE Customers SET  address = ?, city = ?, state = ?, zipcode = ?, email = ?, customer_phone = ?   WHERE customer_id = ?`;
      
        // Run the 1st query
        db.pool.query(queryUpdateCustomer, [customer_address, customer_city, customer_state,customer_zipcode,customer_email,customer_phone,customer_id], function(error, rows, fields){
        if (error) {
      
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
      
        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else
        {
            res.send(rows);
        }
    })});




// Employees Route
app.post('/add-employee-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (employee_fname, employee_lname, employee_phone, hire_date) VALUES ('${data.employee_fname}', '${data.employee_lname}', '${data.employee_phone}', '${data.employee_hiredate}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM Employees;`;
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


app.delete('/delete-employee-ajax', function(req,res,next){
    let data = req.body;
    let employee_id = parseInt(data.employee_id);
    let deleteEmployee= `DELETE FROM Employees WHERE employee_id = ?`;
  
  
        // Run the 1st query
        db.pool.query(deleteEmployee, [employee_id], function(error, rows, fields){
            if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
            res.sendStatus(204);
            }
  
})});


// Sales Route
app.post('/add-sale-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
        
        
    // Create the query and run it on the database
    query1 = `INSERT INTO Sales (employee_id, customer_id, sale_revenue, sold_date) VALUES ('${data.employee_id}', '${data.customer_id}', '${data.sale_revenue}', '${data.sold_date}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
            } else {
                // If there was no error, perform a SELECT *
                query2 = `SELECT * FROM Sales;`;
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

  
let queryUpdateCustomer = `UPDATE Customers SET  address = ?, city = ?, state = ?, zipcode = ?, email = ?, customer_phone = ?   WHERE customer_id = ?`;
  
    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [customer_address, customer_city, customer_state,customer_zipcode,customer_email,customer_phone,customer_id], function(error, rows, fields){
    if (error) {
  
    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
    }
  
    // If there was no error, we run our second query and return that data so we can use it to update the people's
    // table on the front-end
    else
    {
        res.send(rows);
    }
})






/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});