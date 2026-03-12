const express = require("express");
const router = express.Router();
const {
  getAllSuppliers,
  addSupplier
} = require("../controllers/supplierController");

router.get("/", getAllSuppliers);
router.post("/", addSupplier);

module.exports = router;