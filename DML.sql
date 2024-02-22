-- These are some Database Manipulation queries for a partially implemented website.
-- We will be using the Retro Games datase. 



-- Statements for Developer

-- Create

INSERT INTO Developers (developer_name, developer_country, developer_email)
VALUES (:nameInput, :countryInput, :emailInput);

-- Read

Select * FROM Developers;

-- Update

Update Developers 
SET developer_name = :nameInput, developer_country = :countryInput, developer_email = emailInput
WHERE id = :id_selected_from_developer;



-- Delete

DELETE FROM Developers WHERE id = :id_selected_from_developer


-- Statments for Sales

-- Create

INSERT INTO Sales (employee_id, customer_id, sale_revenue, sold_date)
VALUES (:employeeIdInput, customerIdInput, saleRevenueInput);

-- Read

Select * FROM Sales;

-- Update

UPDATE Sales 
SET employee_id = employeeIdInput , customer_id = :customerIdInput, sale_revenue = :revenueInput, sold_date = :dateInput
WHERE sale_id = :id_selected_from_sales;

-- Delete

DELETE FROM Sales WHERE id = :id_selected_from_sales;

-- Select Operations.




--Statements for video games

-- Create

NSERT INTO VideoGames (developer_id, video_game_name, price, quantity)
VALUES (:developerIdInput, :nameInput,:priceInput, :quantityInput)

-- Read
SELECT video_game_id, Developers.developer_name as Developer, video_game_name, price, quantity
 FROM VideoGames
 INNER JOIN Developers ON Developers.developer_id = VideoGames.developer_id;

-- Update

Update VideoGames 
SET developer_id = (SELECT developer_id FROM Developers WHERE developer_name = :developerNameInput), video_game_name = :nameInput, price = :priceInput, quantity = :quantityInput
WHERE id = :id_selected_from_videogames;

-- Delete

DELETE FROM VideoGames WHERE id = :id_selected_from_videogames;



-- Get all videogames made by a developer. 
SELECT VideoGames.video_game_name AS title
FROM VideoGames
JOIN Developers ON Videogames.developer_id = developer.id
WHERE Developers.name = 'Cool Games';




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
WHERE employee_id ==:id_selected_from_employee;


--DELETE

DELETE FROM Employees WHERE id = ::id_selected_from_employee


-- Statements from Video Games Sales


--- Create 

INSERT INTO VideoGameSales(sale_id,video_game_id)
VALUES (:saleIdInput,:videoGameIdInput)
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
