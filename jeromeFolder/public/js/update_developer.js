/* # Citation for the following function: update_developer.js
   # Date: 02/29/2024
   # Copied from /OR/ Adapted from /OR/ Based on: CS340 starter code.
   # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/


// Get the objects we need to modify
let updateDeveloperForm = document.getElementById('update-developer-form-ajax');

// Modify the objects we need
updateDeveloperForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDeveloperName = document.getElementById("input-developer_name-update");
    let inputDeveloperCountry = document.getElementById("input-developer_country-update");
    let inputDeveloperEmail = document.getElementById("input-developer_email-update");


    // Get the values from the form fields
    let developer_nameValue = inputDeveloperName.value;
    let developer_countryValue = inputDeveloperCountry.value;
    let developer_emailValue = inputDeveloperEmail.value;


    
    // Put our data we want to send in a javascript object
    let data = {
        developer_name: developer_nameValue,
        developer_country: developer_countryValue,
        developer_email: developer_emailValue,
    }
    console.log("Data to be sent:", data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-developer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

         //   console.log("Response received:", xhttp.response);
            // Add the new data to the table
            updateRow(xhttp.response, data.developer_name);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, developer_id){
    let parsedData = JSON.parse(data);

  //  console.log("Data to be parsed:", parsedData);
    
    let table = document.getElementById("developer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == developer_id) {

            // Get the location of the row where we found the matching developer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of country and email values.
            let tdName = updateRowIndex.getElementsByTagName("td")[0];
            let tdCountry = updateRowIndex.getElementsByTagName("td")[1];
            let tdEmail = updateRowIndex.getElementsByTagName("td")[2];

            // Reassing name, country and email values.
            tdName.innerHTML = parsedData[0].developer_name;
            tdCountry.innerHTML = parsedData[0].developer_country;
            tdEmail.innerHTML = parsedData[0].developer_email;

       }
    }
}
