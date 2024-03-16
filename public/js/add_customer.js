/* # Citation for the following function: add_customer.js
   # Date: 03/06/2024
   # Adapted from CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerFname = document.getElementById("input-customer_fname");
    let inputCustomerLname = document.getElementById("input-customer_lname");
    let inputAddress = document.getElementById("input-address");
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");
    let inputZipcode = document.getElementById("input-zipcode");
    let inputEmail = document.getElementById("input-email");
    let inputCustomerPhone = document.getElementById("input-customer_phone");

    // Get the values from the form fields
    let customerFnameValue = inputCustomerFname.value;
    let customerLnameValue = inputCustomerLname.value;
    let customerAddressValue = inputAddress.value;
    let customerCityValue = inputCity.value;
    let customerStateValue = inputState.value;
    let customerZipcodeValue = inputZipcode.value;
    let customerEmailValue = inputEmail.value;
    let customerPhoneValue = inputCustomerPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_fname: customerFnameValue,
        customer_lname: customerLnameValue,
        customer_address: customerAddressValue,
        customer_city: customerCityValue,
        customer_state: customerStateValue,
        customer_zipcode: customerZipcodeValue,
        customer_email: customerEmailValue,
        customer_phone: customerPhoneValue,
    }
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerFname.value = '';
            inputCustomerLname.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZipcode.value = '';
            inputEmail.value = '';
            inputCustomerPhone.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


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

    // Create a row and 4 cells
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
    customer_addressCell.innerText = newRow.customer_address;
    customer_cityCell.innerText = newRow.customer_city;
    customer_stateCell.innerText = newRow.customer_state;
    customer_zipcodeCell.innerText = newRow.customer_zipcode;
    customer_emailCell.innerText = newRow.customer_email;
    customer_phoneCell.innerText = newRow.customer_phone;
    

    
    // Create the delete button
    deleteCell = document.createElement("TD");
    deleteCell.innerHTML = "<button>Delete</button>";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customer_id);
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

    row.setAttribute('data-value', newRow.customer_id);

        
    // Add the row to the table
    currentTable.appendChild(row);
}