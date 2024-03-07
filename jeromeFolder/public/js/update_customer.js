
// Get the objects we need to modify
let updateDeveloperForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateDeveloperForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerId = document.getElementById("input-customer_id-update");
    let inputCustomerAddress = doc
    let inputCustomerCity = document.getElementById("input-developer_city-update");
    let inputCustomerState = document.getElementById("input-developer_state-update");
    let inputCustomerZipcode = document.getElementById("input-customer_zipcode-update");
    let inputCustomerEmail = document.getElementById("input-customer_email-update");
    let inputCustomerPhone = document.getElementById("input-customer_phone-update");



    // Get the values from the form fields
    let customer_idValue = inputCustomerId.value;
    let customer_cityValue = inputCustomerCity.value;
    let customer_stateValue = inputCustomerState.value;
    let customer_zipcodeValue = inputCustomerZipcode.value;
    let customer_emailValue = inputCustomerEmail.value;
    let customer_phoneValue = inputCustomerPhone.value;


    
    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_idValue,
        customer_city: customer_cityValue,
        customer_state: customer_stateValue,
        customer_zipcode: customer_zipcodeValue,
        customer_email: customer_emailValue.value,
        customer_phone: customer_phoneValue.value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, data.customer_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customer_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("developer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customer_id) {

            // Get the location of the row where we found the matching developer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of country and email values.
            let tdAddress = updateRowIndex.getElementsByTagName("td")[4];
            let tdCity = updateRowIndex.getElementsByTagName("td")[5];
            let tdState = updateRowIndex.getElementsByTagName("td")[6];
            let tdZipcode = updateRowIndex.getElementsByTagName("td")[7];
            let tdEmail = updateRowIndex.getElementsByTagName("td")[8];
            let tdPhone = updateRowIndex.getElementsByTagName("td")[9];

            // Reassing name, country and email values.
            tdAddress.innerHTML = parsedData[0].customer_address;
            tdCity.innerHTML = parsedData[0].developer_country;
            tdEmail.innerHTML = parsedData[0].developer_email;

       }
    }
}
