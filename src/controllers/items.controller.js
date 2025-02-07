const db = require("../config/db");

// Get all users
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query("SELECT * FROM items");
    let response = {status : 200, length : items.length, items, message: "Items fetched successfully!"};
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};