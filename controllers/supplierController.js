const db = require("../config/db");

const getAllSuppliers = (req, res) => {
  const sql = "SELECT * FROM suppliers ORDER BY supplier_id ASC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const addSupplier = (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO suppliers (name, email, phone, address)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, address], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Supplier added successfully",
      supplierId: result.insertId
    });
  });
};

module.exports = {
  getAllSuppliers,
  addSupplier
};