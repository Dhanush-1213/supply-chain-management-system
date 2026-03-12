USE supply_chain;

DELIMITER $$

CREATE PROCEDURE GetLowStock(IN min_qty INT)
BEGIN
    SELECT
        p.product_name,
        w.warehouse_name,
        i.quantity
    FROM inventory i
    JOIN products p ON i.product_id = p.product_id
    JOIN warehouses w ON i.warehouse_id = w.warehouse_id
    WHERE i.quantity < min_qty;
END $$

CREATE PROCEDURE GetCustomerOrders(IN cust_id INT)
BEGIN
    SELECT
        o.order_id,
        o.order_date,
        o.status,
        p.product_name,
        oi.quantity,
        oi.price
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.customer_id = cust_id;
END $$

DELIMITER ;