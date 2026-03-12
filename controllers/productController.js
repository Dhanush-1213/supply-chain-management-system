const db = require("../config/db");

const getAllProducts = async (req, res) => {
  try {
    const sql = `
      SELECT
        p.product_id,
        p.product_name,
        p.category,
        p.price,
        s.name AS supplier_name
      FROM products p
      JOIN suppliers s ON p.supplier_id = s.supplier_id
      ORDER BY p.product_id ASC
    `;

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { product_name, category, price, supplier_id } = req.body;

    if (!product_name || !category || !price || !supplier_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
      INSERT INTO products (product_name, category, price, supplier_id)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      product_name,
      category,
      price,
      supplier_id
    ]);

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct
};