USE supply_chain;

INSERT INTO suppliers (name, email, phone, address) VALUES
('ABC Electronics', 'abc@gmail.com', '9876543210', 'Chennai'),
('Global Parts', 'global@gmail.com', '9876543211', 'Bangalore');

INSERT INTO products (product_name, category, price, supplier_id) VALUES
('Laptop', 'Electronics', 75000.00, 1),
('Mouse', 'Electronics', 500.00, 1),
('Keyboard', 'Electronics', 1200.00, 2);

INSERT INTO warehouses (warehouse_name, location, capacity) VALUES
('Central Warehouse', 'Chennai', 500),
('North Warehouse', 'Delhi', 300);

INSERT INTO customers (customer_name, email, phone, address) VALUES
('Rahul', 'rahul@gmail.com', '9998887776', 'Mumbai'),
('Anita', 'anita@gmail.com', '9998887775', 'Hyderabad');

INSERT INTO inventory (product_id, warehouse_id, quantity, last_updated) VALUES
(1, 1, 50, NOW()),
(2, 1, 120, NOW()),
(3, 2, 80, NOW());

INSERT INTO orders (customer_id, order_date, status) VALUES
(1, CURDATE(), 'Placed'),
(2, CURDATE(), 'Placed');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 75000.00),
(1, 2, 2, 500.00),
(2, 3, 1, 1200.00);

INSERT INTO shipments (order_id, warehouse_id, shipment_date, delivery_status) VALUES
(1, 1, CURDATE(), 'Processing'),
(2, 2, CURDATE(), 'Shipped');