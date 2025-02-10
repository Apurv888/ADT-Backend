-- This trigger is applied on items table, for inserting the unique ItemID every time and which is as per our usecase. 
-- like ESS1,SEV2

DELIMITER $$ -- Tell sql that trigger starts here and do not stop execution when you find ;

CREATE TRIGGER before_insert_items
BEFORE INSERT ON items
FOR EACH ROW
BEGIN -- Login starts
    DECLARE prefix VARCHAR(3);
    DECLARE last_number INT;
    DECLARE new_id VARCHAR(10); -- final newid
    DECLARE item_name VARCHAR(255); -- Declare a variable for ItemName
    
    -- Fetch ItemName from the parent table (products)
    SELECT name INTO item_name 
    FROM products 
    WHERE productid = NEW.productid; 

    -- Extract the first three characters of ItemName (uppercase)
    SET prefix = UPPER(LEFT(item_name, 3));

    -- Get the last number for this prefix
    -- find the max value for the given product
    SELECT COALESCE(MAX(CAST(SUBSTRING(ItemID, 4) AS UNSIGNED)), 0) 
    INTO last_number
    FROM items
    WHERE ItemID LIKE CONCAT(prefix, '%');

    -- Generate new ItemID
    SET new_id = CONCAT(prefix, last_number + 1);
    
    -- Assign to NEW row
    SET NEW.ItemID = new_id;
END$$

DELIMITER ;