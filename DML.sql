-- These are some Database Manipulation queries for a partially implemented website.
-- We will be using the Retro Games datase. 


-- Select Operations.

-- Get table of developers.
Select developer_name FROM Developers;

-- Get all developer IDs and Names to populate the Homeworld dropdown. 
SELECT developer_id, name FROM Developers;

-- Get table of sales.
Select sale_revenue FROM Sales;

-- Get table of videogames.
SELECT video_game_name FROM VideoGames;

-- Get all videogames made by a developer. 
SELECT VideoGames.video_game_name AS title
FROM VideoGames
JOIN Developers ON Videogames.developer_id = developer.id
WHERE Developers.name = 'Cool Games';


-- Insert Operations.

-- Insert Developer data. 
INSERT INTO Developers (developer_name, developer_country, developer_email)
VALUES ('Developer Name', 'Developer Country', 'email');

-- Insert Sales data.
INSERT INTO Sales (employee_id, customer_id, sale_revenue, sold_date)
VALUES ('Employee ID', 'Customer ID', 'Sale Revenue');

-- Insert VideoGames data.
INSERT INTO VideoGames (developer_id, video_game_name, price, quantity)
VALUES ('Developer ID', 'Videogame name', 'price', 'quantity')



-- Upate Operations

-- Update Developer data. 
Update Developers SET developer_name = :developer_nameInput, developer_country = :developer_countryInput, developer_email = :developer_emailInput WHERE id = :developer_id_from_the_update_form;

-- Update Sales data.
Update Sales SET employee_id = :employee_nameInput, customer_id = :customer_nameInput, sale_revenue = :sale_revenueInput, sold_date = :sale_dateInput WHERE id = :sale_id_from_the_update_form;

-- Update VideoGames data.
Update VideoGames SET developer_id = :developer_nameInput, video_game_name = :videogame_nameInput, price = :priceInput, quantity = :quantityInput WHERE :videogame_id_from_the_udate_form;



-- Delete Operations

-- Delete Developer data.
DELETE FROM Developers WHERE id = :developer_Id_selected_from_browse_developer_page;

-- Delete Sales data.
DELETE FROM Sales WHERE id = :sale_Id_selected_from_browse_developer_page;

-- Delete VideoGames data.
DELETE FROM VideoGames WHERE id = :videogame_Id_selected_from_browse_developer_page;


-- associate a videogame with sales (M-to-M relationship addition)
INSERT INTO VideoGameSales(video_game_id, sales_id) VALUES (:video_id_from_dropdown_input, :sales_id_from_dropdown_input);





--- Statements for Customer


--- Create 

INSERT INTO Customers(customer_fname,,customer_lname,address,city,state,zipcode,email,customer_phone)
VALUES (:fnameInput,:lnameInput,:addressInput,:cityInput,:stateInput,:zipcodeInput,:emailInput,:phoneInput);

-- Read

SELECT customer_id,customer_fname,,customer_lname,address,city,state,zipcode,email,customer_phone
FROM Customers;

--UPDATE


-- to get the entry to update
SELECT customer_id,customer_fname,,customer_lname,address,city,state,zipcode,email,customer_phone
FROM Customers
WHERE customer_id ==:id_selected_from_customer;

UPDATE Customers
SET customer_fname = :fnameInput, customer_lname =:lnameInput,address = :addressInput, city = :cityInput,
state = :stateInput, zipcode = :zipcodeInput, email = :emailInput,customer_phone = :phoneInput
WHERE customer_id ==:id_selected_from_customer;


--DELETE

DELETE FROM Customers WHERE id = ::id_selected_from_customer


-- to get the entry to update


--- Statements for Employee


--- Create 

INSERT INTO Employees(employee_fname, employee_lname,employee_phone,hire_date)
VALUES (:fnameInput,:lnameInput,:phoneInput,:hireInput)
-- Read

SELECT employee_id,employee_fname, employee_lname,employee_phone,hire_date
FROM employees

--UPDATE

-- to get the entry to update
SELECT employee_fname, employee_lname,employee_phone,hire_date
FROM Employees
WHERE employee_id ==:id_selected_from_employee;

UPDATE Employees
SET employee_fname = :fnameInput, employee_lname = :lnameInput,employee_phone = :phoneInput, hire_date = :hireInput
WHERE customer_id ==:id_selected_from_employee;


--DELETE

DELETE FROM Employees WHERE id = ::id_selected_from_employee


-- Statements from Video Games Sales


--- Create 

INSERT INTO (employee_fname, employee_lname,employee_phone,hire_date)
VALUES (:fnameInput,:lnameInput,:phoneInput,:hireInput)
-- Read

SELECT video_games_sales_id,videogamesales.sale_id,Customers.customer_fname,Customers.customer_lname,VideoGames.video_game_name
FROM VideoGameSales
INNER JOIN Sales
ON VideoGameSales.sale_id=Sales.sale_id
INNER JOIN Customers
ON  Sales.customer_id = Customers.customer_id
INNER JOIN VideoGames 
ON VideoGameSales.video_game_id = VideoGames.video_game_id

--UPDATE

-- to get the entry to update
SELECT video_games_sales_id,videogamesales.sale_id,Customers.customer_fname,Customers.customer_lname,VideoGames.video_game_name
FROM VideoGameSales
INNER JOIN Sales
ON VideoGameSales.sale_id=Sales.sale_id
INNER JOIN Customers
ON  Sales.customer_id = Customers.customer_id
INNER JOIN VideoGames 
ON VideoGameSales.video_game_id = VideoGames.video_game_id
WHERE video_games_sales_id =: video_games_sales_id_selected;

UPDATE VideoGameSales
SET  video_game_id = (SELECT video_game_id FROM VideoGames WHERE video_game_name = :namePickedFromDropDown)
WHERE video_games_sales_id ==:video_games_sales_id_selected;


--DELETE

DELETE FROM VideoGamesSales WHERE id = ::id_selected_from_video_game_sales

-- dis-associate a video game from a sale (M-to-M relationship deletion)
DELETE FROM video_game_sales WHERE sale_id =:video_game_ID_selected_from_sale_and_videogame_list AND video_game_id = :sale_ID_selected_from-sale_and_videogame_list
