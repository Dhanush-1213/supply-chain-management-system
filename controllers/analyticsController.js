const db = require("../config/db");

const getTopSellingProducts = async (req, res) => {
  try {
    const sql = `
      SELECT
        p.product_name,
        SUM(oi.quantity) AS total_sold
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
      GROUP BY p.product_name
      ORDER BY total_sold DESC
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
  getTopSellingProducts
};