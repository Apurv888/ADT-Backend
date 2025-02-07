const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Define routes
router.get("/get-users", userController.getUsers);

module.exports = router;