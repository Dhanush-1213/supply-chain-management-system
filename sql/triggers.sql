USE supply_chain;

DELIMITER $$

CREATE TRIGGER reduce_inventory_after_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE inventory
    SET quantity = quantity - NEW.quantity,
        last_updated = NOW()
    WHERE product_id = NEW.product_id;
END $$

DELIMITER ;