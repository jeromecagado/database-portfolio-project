/* # Citation for the following function: delete_developer.js
   # Date: 02/29/2024
   # Copied from /OR/ Adapted from /OR/ Based on: CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/




function deleteSale(sale_id) {
    // Put our data we want to send in a javascript object
    let data = {
        sale_id: sale_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            console.log("Sale deleted successfully");
            // Delete the data to the table
            deleteRow(sale_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(sale_id){

    let table = document.getElementById("sale-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == sale_id) {
            table.deleteRow(i);
            break;
       }
    }
}




// Creates a single row from an Object representing a single record from
// sales.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sale-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let sale_idCell = document.createElement("TD");
    let customer_idCell = document.createElement("TD");
    let sale_revenueCell = document.createElement("TD");
    let sold_dateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    sale_idCell.innerText = newRow.sale_id;
    customer_idCell.innerText = newRow.customer_id;
    sale_revenueCell.innerText = newRow.sale_revenue;
    sold_dateCell.innerText = newRow.sold_date;

    deleteCell = document.createElement("TD");
    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteSale(newRow.sale_id);
    };

    // Add the cells to the row
    row.appendChild(sale_idCell);
    row.appendChild(customer_idCell);
    row.appendChild(sale_revenueCell);
    row.appendChild(sold_dateCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.sale_id);

    // Add the row to the table
    currentTable.appendChild(row);
}