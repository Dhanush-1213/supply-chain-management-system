const express = require("express");
const router = express.Router();
const { getTopSellingProducts } = require("../controllers/analyticsController");

router.get("/top-products", getTopSellingProducts);

module.exports = router;