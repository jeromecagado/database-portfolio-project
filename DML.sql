-- These are some Database Manipulation queries for a partially implemented website.
-- We will be using the Retro Games datase. 


-- Select Operations.

-- Get table of developers.
Select * FROM Developers;

-- Get table of sales.
Select * FROM Sales;

-- Get table of videogames.
SELECT * FROM VideoGames;

-- Get all videogames made by a developer. 
SELECT VideoGames.video_game_name AS title
FROM Developers
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
Update Developers SET developer_name = 'Updated Name', developer_country = 'Updated Country', developer_email = 'Updated email' WHERE id = 1;
Update Developers SET developer_name = 'Updated Name', developer_country = 'Updated Country', developer_email = 'Updated email' WHERE id = 2;
Update Developers SET developer_name = 'Updated Name', developer_country = 'Updated Country', developer_email = 'Updated email' WHERE id = 3;

-- Update Sales data.
Upate Sales SET employee_id = 'Updated employee', customer_id = 'Updated customer', sale_revenue = 'revenue', sold_date = 'dates sold' WHERE id = 1;
Upate Sales SET employee_id = 'Updated employee', customer_id = 'Updated customer', sale_revenue = 'revenue', sold_date = 'dates sold' WHERE id = 2;
Upate Sales SET employee_id = 'Updated employee', customer_id = 'Updated customer', sale_revenue = 'revenue', sold_date = 'dates sold' WHERE id = 3;

-- Update VideoGames data.
Update VideoGames SET developer_id = "Updated developer", video_game_name = 'Updated title', price = 'price', quantity = 'quantity' WHERE id = 1;
Update VideoGames SET developer_id = "Updated developer", video_game_name = 'Updated title', price = 'price', quantity = 'quantity' WHERE id = 2;
Update VideoGames SET developer_id = "Updated developer", video_game_name = 'Updated title', price = 'price', quantity = 'quantity' WHERE id = 3;


-- Delete Operations

-- Delete Developer data.
DELETE FROM Developers WHERE id = 1;
DELETE FROM Developers WHERE id = 2;
DELETE FROM Developers WHERE id = 3;

-- Delete Sales data.
DELETE FROM Sales WHERE id = 1;
DELETE FROM Sales WHERE id = 2;
DELETE FROM Sales WHERE id = 3;

-- Delete VideoGames data.
DELETE FROM VideoGames WHERE id = 1;
DELETE FROM VideoGames WHERE id = 2;
DELETE FROM VideoGames WHERE id = 3;




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

INSERT INTO Employees(employee_fname, employee_lname,employee_phone,hire_date)
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

DELETE FROM VideoGamesSales WHERE id = :id_selected_from_video_game_sales