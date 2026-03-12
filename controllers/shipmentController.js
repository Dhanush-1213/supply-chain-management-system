const db = require("../config/db");

const getShipments = (req, res) => {
  const sql = `
    SELECT
      s.shipment_id,
      o.order_id,
      w.warehouse_name,
      s.shipment_date,
      s.delivery_status
    FROM shipments s
    JOIN orders o ON s.order_id = o.order_id
    JOIN warehouses w ON s.warehouse_id = w.warehouse_id
    ORDER BY s.shipment_id ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

module.exports = {
  getShipments
};