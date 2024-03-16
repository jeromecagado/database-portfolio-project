/* # Citation for the following function: add_videogame.js
   # Date: 02/29/2024
   # Adapted from CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addVideogameForm = document.getElementById('add-videogame-form-ajax');

// Modify the objects we need
addVideogameForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDeveloperId = document.getElementById("input-developer_id");
    let inputVideogameName = document.getElementById("input-video_game_name");
    let inputPrice = document.getElementById("input-price");
    let inputQuantity = document.getElementById("input-quantity");

    // Get the values from the form fields
    let developerIdValue = inputDeveloperId.value;
    let videogameNameValue = inputVideogameName.value;
    let videogamePriceValue = inputPrice.value;
    let videogameQuantity = inputQuantity.value;

    // Put our data we want to send in a javascript object
    let data = {
        developer_id: developerIdValue,
        video_game_name: videogameNameValue,
        price: videogamePriceValue,
        quantity: videogameQuantity,
    }
   
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-videogame-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDeveloperId.value = '';
            inputVideogameName.value = '';
            inputPrice.value = '';
            inputQuantity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// VideoGames
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("videogame-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let video_game_idCell = document.createElement("TD");
    let developer_idCell = document.createElement("TD");
    let video_game_nameCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    video_game_idCell.innerText = newRow.video_game_id;
    developer_idCell.innerText = newRow.developer_id;
    video_game_nameCell.innerText = newRow.video_game_name;
    priceCell.innerText = newRow.price;
    quantityCell.innerText = newRow.quantity;

    
    // Create the delete button
    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteVideogame(newRow.video_game_id);
    };
    

    // Add the cells to the row 
    row.appendChild(video_game_idCell);
    row.appendChild(developer_idCell);
    row.appendChild(video_game_nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.video_game_id);

        
    // Add the row to the table
    currentTable.appendChild(row);

}