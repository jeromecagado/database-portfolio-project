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

