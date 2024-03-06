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

    let query1 = "SELECT * FROM Customers;"

    db.pool.query(query1, function(error, rows, fields){
    
        res.render('customers', {data: rows});
    })
});

app.get('/sales', function(req, res)
{
    let query1 = "SELECT * FROM Sales"

    db.pool.query(query1, function(error,rows,fields){
        
        res.render('customer', {data: rows})
    })

    res.render('sales');
});

app.get('/videogames', function(req, res)
{

    let query1 = "SELECT "

    res.render('videogames');
});

app.get('/video_game_sales', function(req, res)
{
    res.render('video_game_sales');
});

app.get('/employees', function(req, res)
{
    res.render('employees');
});

// app.js - ROUTES section

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
            // If there was no error, perform a SELECT * on bsg_people
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
    let developer_id = data.developer_name;
    let developer_country = data.developer_country;
    let developer_email = data.developer_email;
  
    let queryUpdateDeveloper = `UPDATE Developers SET developer_country = ?, developer_email = ? WHERE developer_id = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateDeveloper, [developer_country, developer_email, developer_id], function(error, rows, fields){
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



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});