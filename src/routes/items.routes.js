const express = require("express");
const router = express.Router();
const itemController = require("../controllers/items.controller");

// Define routes
router.get("/get-items", itemController.getItems);

module.exports = router;