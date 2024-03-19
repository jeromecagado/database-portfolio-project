/* # Citation for the following function: add_developer.js
   # Date: 02/29/2024
   # Adapted from CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addDeveloperForm = document.getElementById('add-developer-form-ajax');

// Modify the objects we need
addDeveloperForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDeveloperName = document.getElementById("input-developer_name");
    let inputDeveloperCountry = document.getElementById("input-developer_country");
    let inputDeveloperEmail = document.getElementById("input-developer_email");

    // Get the values from the form fields
    let developerNameValue = inputDeveloperName.value;
    let developerCountryValue = inputDeveloperCountry.value;
    let developerEmailValue = inputDeveloperEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        developer_name: developerNameValue,
        developer_country: developerCountryValue,
        developer_email: developerEmailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-developer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDeveloperName.value = '';
            inputDeveloperCountry.value = '';
            inputDeveloperEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Developers
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

    
    // Create the delete button
    deleteCell = document.createElement("TD");
    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteDeveloper(newRow.developer_id);
    };
    

    // Add the cells to the row 
    row.appendChild(developer_idCell);
    row.appendChild(developer_nameCell);
    row.appendChild(developer_countryCell);
    row.appendChild(developer_emailCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.developer_id);

        
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("input-developer_id-update");
    let option = document.createElement("option");
    option.text = newRow.developer_name;
    option.value = newRow.developer_id;
    selectMenu.add(option);
}