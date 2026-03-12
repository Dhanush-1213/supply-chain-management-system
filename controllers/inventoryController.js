const db = require("../config/db");

const getInventoryStatus = async (req, res) => {
  try {
    const sql = `
      SELECT
        i.inventory_id,
        p.product_name,
        w.warehouse_name,
        i.quantity,
        i.last_updated
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      ORDER BY i.inventory_id ASC
    `;

    const [rows] = await db.query(sql);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getInventoryStatus
};