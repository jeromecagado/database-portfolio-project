/* # Citation for the following function: delete_employer.js
   # Date: 03/14/2024
   # Adapted from CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/




function deleteEmployee(employee_id) {
    // Put our data we want to send in a javascript object
    let data = {
        employee_id: employee_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data to the table
            deleteRow(employee_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(employee_id){

    let table = document.getElementById("employee-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employee_id) {
            table.deleteRow(i);
            break;
       }
    }
}




// Creates a single row from an Object representing a single record from
// Employees
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employee-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let employee_idCell = document.createElement("TD");
    let employee_fnameCell = document.createElement("TD");
    let employee_lnameCell = document.createElement("TD");
    let employee_phoneCell = document.createElement("TD");
    let hire_dateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    employee_idCell.innerText = newRow.employee_id;
    employee_fnameCell.innerText = newRow.employee_fname;
    employee_lnameCell.innerText = newRow.employee_lname;
    employee_phoneCell.innerText = newRow.employee_phone;
    hire_dateCell.innerText = newRow.hire_date;

    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.employee_id);
    };


    // Add the cells to the row
    row.appendChild(employee_idCell);
    row.appendChild(employee_fnameCell);
    row.appendChild(employee_lnameCell);
    row.appendChild(employee_phoneCell);
    row.appendChild(hire_dateCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.employee_id);

    // Add the row to the table
    currentTable.appendChild(row);
}