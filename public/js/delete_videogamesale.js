/* # Citation for the following function: delete_videogamesale.js
   # Date: 03/14/2024
   # Copied from /OR/ Adapted from /OR/ Based on: CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/



function deleteVideoGameSale(video_games_sales_id) {
    // Put our data we want to send in a javascript object
    let data = {
        video_games_sales_id: video_games_sales_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-videogamesale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data to the table
            deleteRow(video_games_sales_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(video_games_sales_id){

    let table = document.getElementById("videogamesales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == video_games_sales_id) {
            table.deleteRow(i);
            break;
       }
    }
}