const express = require("express");
const router = express.Router();
const itemController = require("../controllers/items.controller");

// Define routes
router.get("/get-items", itemController.getItems);
router.post("/insert-item",itemController.insertItem);

module.exports = router;