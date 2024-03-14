/* # Citation for the following function: add_developer.js
   # Date: 02/29/2024
   # Copied from /OR/ Adapted from /OR/ Based on: CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addVideogameForm = document.getElementById('add-videogamesale-form-ajax');

// Modify the objects we need
addVideogameForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSaleID = document.getElementById("input-sale_id");
    let inputVideoGameID = document.getElementById("input-videogame_id");
    

    // Get the values from the form fields
    let saleIdValue = inputSaleID.value;
    let videoGameIdValue = inputVideoGameID.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        sale_id: saleIdValue,
        video_game_id: videoGameIdValue,
    
    }
   
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-videogamesale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSaleID.value = '';
            inputVideoGameID.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("videogamesales-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let video_game_sale_idCell = document.createElement("TD");
    let sale_idCell = document.createElement("TD");
    let video_game_idCell = document.createElement("TD");
    

    let deleteCell = document.createElement("TD");

    console.log(data)
    // Fill the cells with correct data
    video_game_sale_idCell.innerText = newRow.video_games_sales_id;
    sale_idCell.innerText = newRow.sale_id;
    video_game_idCell.innerText = newRow.video_game_id;
    

    
    // Create the delete button
    deleteCell = document.createElement("TD");
    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteVideoGameSale(newRow.video_games_sales_id);
    };
    

    // Add the cells to the row 
    row.appendChild(video_game_sale_idCell);
    row.appendChild(sale_idCell);
    row.appendChild(video_game_idCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.video_games_sales_id);

        
    // Add the row to the table
    currentTable.appendChild(row);

}