const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { placeOrder, getOrders } = require("../controllers/orderController");

router.get("/", getOrders);

router.post(
  "/place",
  [
    body("customer_id").isInt(),
    body("warehouse_id").isInt(),
    body("items").isArray({ min: 1 })
  ],
  placeOrder
);

module.exports = router;