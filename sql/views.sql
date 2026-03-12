USE supply_chain;

CREATE VIEW vw_product_supplier AS
SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.price,
    s.name AS supplier_name
FROM products p
JOIN suppliers s ON p.supplier_id = s.supplier_id;

CREATE VIEW vw_order_summary AS
SELECT
    o.order_id,
    c.customer_name,
    o.order_date,
    o.status,
    SUM(oi.quantity * oi.price) AS total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.customer_name, o.order_date, o.status;

CREATE VIEW vw_inventory_status AS
SELECT
    i.inventory_id,
    p.product_name,
    w.warehouse_name,
    i.quantity,
    i.last_updated
FROM inventory i
JOIN products p ON i.product_id = p.product_id
JOIN warehouses w ON i.warehouse_id = w.warehouse_id;