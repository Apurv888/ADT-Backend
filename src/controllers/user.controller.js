const db = require("../config/db");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    let response = {status : 200, length : users.length, users, message: "Users fetched successfully!"};
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};