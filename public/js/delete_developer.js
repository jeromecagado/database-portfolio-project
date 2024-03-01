function deleteDeveloper(developer_id) {
    // Put our data we want to send in a javascript object
    let data = {
        developer_id: developer_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-developer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the data to the table
            deleteRow(developer_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(developer_id){

    let table = document.getElementById("developer-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == developer_id) {
            table.deleteRow(i);
            deleteDropDownMenu(developer_id);
            break;
       }
    }
}

function deleteDropDownMenu(developer_id){
    let selectMenu = document.getElementById("input-developer_name");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(developer_id)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }

// Creates a single row from an Object representing a single record from
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("developer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let developer_idCell = document.createElement("TD");
    let developer_nameCell = document.createElement("TD");
    let developer_countryCell = document.createElement("TD");
    let developer_emailCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    developer_idCell.innerText = newRow.developer_id;
    developer_nameCell.innerText = newRow.developer_name;
    developer_countryCell.innerText = newRow.developer_country;
    developer_emailCell.innerText = newRow.developer_email;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDeveloper(newRow.developer_id);
    };


    // Add the cells to the row
    row.appendChild(developer_idCell);
    row.appendChild(developer_nameCell);
    row.appendChild(developer_countryCell);
    row.appendChild(developer_emailCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.developer_id);

    // Add the row to the table
    currentTable.appendChild(row);
}