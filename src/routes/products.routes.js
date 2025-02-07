const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");

// Define routes
router.get("/get-products", productsController.getProducts);
router.post("/add-product", productsController.addProduct);

module.exports = router;