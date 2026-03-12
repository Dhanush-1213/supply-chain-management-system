const db = require("../config/db");

const getOrders = async (req, res) => {
  try {
    const sql = `
      SELECT
        o.order_id,
        c.customer_name,
        o.order_date,
        o.status
      FROM orders o
      JOIN customers c ON o.customer_id = c.customer_id
      ORDER BY o.order_id ASC
    `;

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addOrder = async (req, res) => {
  try {
    const { customer_id, order_date, status } = req.body;

    if (!customer_id || !order_date || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
      INSERT INTO orders (customer_id, order_date, status)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [customer_id, order_date, status]);

    res.status(201).json({
      message: "Order added successfully",
      orderId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const placeOrder = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { customer_id, items, warehouse_id } = req.body;

    if (!customer_id || !warehouse_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "customer_id, warehouse_id, and items are required" });
    }

    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      `INSERT INTO orders (customer_id, order_date, status) VALUES (?, CURDATE(), 'Placed')`,
      [customer_id]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const { product_id, quantity, price } = item;

      const [inventoryRows] = await connection.query(
        `SELECT quantity FROM inventory WHERE product_id = ? AND warehouse_id = ? FOR UPDATE`,
        [product_id, warehouse_id]
      );

      if (inventoryRows.length === 0) {
        throw new Error(`No inventory found for product_id ${product_id} in warehouse ${warehouse_id}`);
      }

      if (inventoryRows[0].quantity < quantity) {
        throw new Error(`Insufficient inventory for product_id ${product_id}`);
      }

      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, product_id, quantity, price]
      );

      await connection.query(
        `UPDATE inventory
         SET quantity = quantity - ?, last_updated = NOW()
         WHERE product_id = ? AND warehouse_id = ?`,
        [quantity, product_id, warehouse_id]
      );
    }

    await connection.query(
      `INSERT INTO shipments (order_id, warehouse_id, shipment_date, delivery_status)
       VALUES (?, ?, CURDATE(), 'Processing')`,
      [orderId, warehouse_id]
    );

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

module.exports = {
  getOrders,
  addOrder,
  placeOrder
};