const express = require("express");
const router = express.Router();
const {
  getInventoryStatus
} = require("../controllers/inventoryController");

router.get("/", getInventoryStatus);

module.exports = router;