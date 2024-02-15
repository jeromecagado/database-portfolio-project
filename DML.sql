-- These are some Database Manipulation queries for a partially implemented website.
-- We will be using the Retro Games datase. 


-- Select Operations.

-- Get table of developers.
Select developer_name FROM Developers;

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
DELETE FROM Developers WHERE id = :developer_Id_selected_from_browse_developer_page

-- Delete Sales data.
DELETE FROM Sales WHERE id = :sale_Id_selected_from_browse_developer_page

-- Delete VideoGames data.
DELETE FROM VideoGames WHERE id = :videogame_Id_selected_from_browse_developer_page



