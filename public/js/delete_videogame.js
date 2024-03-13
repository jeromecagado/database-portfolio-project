/* # Citation for the following function: delete_developer.js
   # Date: 02/29/2024
   # Copied from /OR/ Adapted from /OR/ Based on: CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/




function deleteVideogame(video_game_id) {
    // Put our data we want to send in a javascript object
    let data = {
        video_game_id: video_game_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-videogame-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data to the table
            deleteRow(video_game_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(video_game_id){

    let table = document.getElementById("videogame-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == video_game_id) {
            table.deleteRow(i);
            break;
       }
    }
}

// Creates a single row from an Object representing a single record from
// bsg_people
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


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDeveloper(newRow.video_game_id);
    };


    // Add the cells to the row
    row.appendChild(video_game_idCell);
    row.appendChild(developer_idCell);
    row.appendChild(video_game_nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(deleteCell);


    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.video_game_id);

    // Add the row to the table
    currentTable.appendChild(row);
}