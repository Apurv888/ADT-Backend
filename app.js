const express = require('express')
const app = express()
const PORT = 3000
const db = require("./src/config/db");
const createTableIfNotExists = require("./src/config/initDB");
const userRoutes = require("./src/routes/user.routes");
const itemRoutes = require("./src/routes/items.routes");
const productRoutes = require("./src/routes/products.routes");

// Middleware
app.use(express.json());

// API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/products", productRoutes);


// Start the server & initialize database
app.listen(PORT, async () => {
  try {
    await db.getConnection(); // Ensure DB is connected
    console.log("✅ MySQL Database Connected!");
    
    await createTableIfNotExists(); // Create table if not exists
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
});