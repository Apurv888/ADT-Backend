const db = require("./db");

const createTableIfNotExists = async () => {
  try {
    // Check if 'users' table exists
    const [usersTable] = await db.query(`SHOW TABLES LIKE 'users'`);
    if (usersTable.length === 0) {
      await db.query(`
        CREATE TABLE users (
          userid INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          phoneno VARCHAR(15) NOT NULL,
          role VARCHAR(20) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ Table 'users' created successfully!");
    }

    // Check if 'users' table exists
    const [credentialTable] = await db.query(`SHOW TABLES LIKE 'credentials'`);
    if (credentialTable.length === 0) {
      await db.query(`
        CREATE TABLE credentials (
          credentialid INT AUTO_INCREMENT PRIMARY KEY,
          userid INT, 
          username VARCHAR(50) NOT NULL,
          passwordhash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userid) REFERENCES users(userid)
        )
      `);
      console.log("✅ Table 'credentials' created successfully!");
    } 

    // Check if 'products' table exists
    const [productsTable] = await db.query(`SHOW TABLES LIKE 'products'`);
    if (productsTable.length === 0) {
      await db.query(`
        CREATE TABLE products (
          productid INT AUTO_INCREMENT PRIMARY KEY,
          productname VARCHAR(100) NOT NULL,
          productdescription VARCHAR(200), 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ Table 'products' created successfully!");
    } 

    // Check if 'products' table exists
    const [itemsTable] = await db.query(`SHOW TABLES LIKE 'items'`);
    if (itemsTable.length === 0) {
      await db.query(`
        CREATE TABLE items (
          itemid INT AUTO_INCREMENT PRIMARY KEY,
          productid INT,
          serialnumber VARCHAR(100),
          receiveddate date,
          phoneno VARCHAR(15) NOT NULL,
          simnumber VARCHAR(50) NOT NULL,
          status TINYINT(1) DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (productid) REFERENCES products(productid)
        )
      `);
      console.log("✅ Table 'products' created successfully!");
    } 
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
};

module.exports = createTableIfNotExists;