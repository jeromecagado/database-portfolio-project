// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeFName = document.getElementById("input-employee_fname");
    let inputEmployeeLName = document.getElementById("input-employee_lname");
    let inputEmployeePhone = document.getElementById("input-employee_phone");
    let inputEmployeeHiredate = document.getElementById("input-employee_hiredate");

    // Get the values from the form fields
    let employeeFNameValue = inputEmployeeFName.value;
    let employeeLNameValue = inputEmployeeLName.value;
    let employeePhoneValue = inputEmployeePhone.value;
    let employeeHiredateValue = inputEmployeeHiredate.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        employee_fname: employeeFNameValue,
        employee_lname: employeeLNameValue,
        employee_phone: employeePhoneValue,
        employee_hiredate: employeeHiredateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeFName.value = '';
            inputEmployeeLName.value = '';
            inputEmployeePhone.value = '';
            inputEmployeeHiredate.value = '';
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
    let employee_hiredateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    employee_idCell.innerText = newRow.employee_id;
    employee_fnameCell.innerText = newRow.employee_fname;
    employee_lnameCell.innerText = newRow.employee_lname;
    employee_phoneCell.innerText = newRow.employee_phone;
    employee_hiredateCell.innerText = newRow.hire_date;


    deleteCell = document.createElement("TD");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.employee_id);
    };


    // Add the cells to the row 
    row.appendChild(employee_idCell);
    row.appendChild(employee_fnameCell);
    row.appendChild(employee_lnameCell);
    row.appendChild(employee_phoneCell);
    row.appendChild(employee_hiredateCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.employee_id);

        
    // Add the row to the table
    currentTable.appendChild(row);
}