/* # Citation for the following function: delete_customer.js
   # Date: 03/06/2024
   # Adapted from CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/


function deleteCustomer(customer_id) {
    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data to the table
            deleteRow(customer_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(customer_id){

    let table = document.getElementById("customer-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customer_id) {
            table.deleteRow(i);
            break;
       }
    }
}


// Creates a single row from an Object representing a single record from
// Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

     // Create a row and cells
    let row = document.createElement("TR");
    let customer_idCell = document.createElement("TD");
    let customer_fnameCell = document.createElement("TD");
    let customer_lnameCell = document.createElement("TD");
    let customer_addressCell = document.createElement("TD");
    let customer_cityCell = document.createElement("TD");
    let customer_stateCell = document.createElement("TD");
    let customer_zipcodeCell = document.createElement("TD");
    let customer_emailCell = document.createElement("TD");
    let customer_phoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    customer_idCell.innerText = newRow.customer_id;
    customer_fnameCell.innerText = newRow.customer_fname;
    customer_lnameCell.innerText = newRow.customer_lname;
    customer_addressCell.innerText = newRow.address;
    customer_cityCell.innerText = newRow.city;
    customer_stateCell.innerText = newRow.state;
    customer_zipcodeCell.innerText = newRow.zipcode;
    customer_emailCell.innerText = newRow.email;
    customer_phoneCell.innerText = newRow.customer_phone;
     

    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteDeveloper(newRow.customer_id);
    };


    // Add the cells to the row
    row.appendChild(customer_idCell);
    row.appendChild(customer_fnameCell);
    row.appendChild(customer_lnameCell);
    row.appendChild(customer_addressCell);
    row.appendChild(customer_cityCell);
    row.appendChild(customer_stateCell);
    row.appendChild(customer_zipcodeCell);
    row.appendChild(customer_emailCell);
    row.appendChild(customer_phoneCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customer_id);

    // Add the row to the table
    currentTable.appendChild(row);
}