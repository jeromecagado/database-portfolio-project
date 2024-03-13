// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeID = document.getElementById("input-employee_id");
    let inputCustomerID = document.getElementById("input-customer_id");
    let inputSaleRevenue = document.getElementById("input-sale_revenue");
    let inputSolddate = document.getElementById("input-sold_date");

    // Get the values from the form fields
    let EmployeeIdValue = inputEmployeeID.value;
    let CustomerIdValue = inputCustomerID.value;
    let SaleRevenueValue = inputSaleRevenue.value;
    let SoldDateValue = inputSolddate.value;

    // Put our data we want to send in a javascript object
    let data = {
        employee_id: EmployeeIdValue,
        customer_id: CustomerIdValue,
        sale_revenue: SaleRevenueValue,
        sold_date: SoldDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeID.value = '';
            inputCustomerID.value = '';
            inputSaleRevenue.value = '';
            inputSoldDate.value = '';
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
    let currentTable = document.getElementById("sale-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let sale_idCell = document.createElement("TD");
    let employee_idCell = document.createElement("TD");
    let customer_idCell = document.createElement("TD");
    let sale_revenueCell = document.createElement("TD");
    let sold_dateCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    sale_idCell.innerText = newRow.sale_id;
    employee_idCell.innerText = newRow.employee_id;
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
    row.appendChild(employee_idCell);
    row.appendChild(customer_idCell);
    row.appendChild(sale_revenueCell);
    row.appendChild(sold_dateCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.sale_id);

        
    // Add the row to the table
    currentTable.appendChild(row);
}