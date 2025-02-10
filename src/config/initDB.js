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

      await db.query(`INSERT INTO products (productname,productdescription) VALUES ('Essence', 'Essence Description')`);

      await db.query(`INSERT INTO products (productname,productdescription) VALUES ('Seven','Seven Description')`);

      await db.query(`INSERT INTO products (productname,productdescription) VALUES ('Beacon','Beacon Description')`);

      await db.query(`INSERT INTO products (productname,productdescription) VALUES ('Eve','Eve Description')`);
    } 

    // Check if 'products' table exists
    const [itemsTable] = await db.query(`SHOW TABLES LIKE 'items'`);
    if (itemsTable.length === 0) {
      await db.query(`
        CREATE TABLE items (
          itemid VARCHAR(50) PRIMARY KEY,
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

      // await db.query(`INSERT INTO ITEMS (productid, serialnumber, receiveddate, phoneno,simnumber) VALUES (1,'SERIAL001','2025-02-08','64220889913','20000330001')`);
      // await db.query(`INSERT INTO ITEMS (productid, serialnumber, receiveddate, phoneno,simnumber) VALUES (2,'SERIAL002','2025-02-08','64220889912','20000330002')`);
      // await db.query(`INSERT INTO ITEMS (productid, serialnumber, receiveddate, phoneno,simnumber) VALUES (2,'SERIAL003','2025-02-08','64220889911','20000330003')`);
      // await db.query(`INSERT INTO ITEMS (productid, serialnumber, receiveddate, phoneno,simnumber) VALUES (1,'SERIAL004','2025-02-08','64220889910','20000330004')`);
      // await db.query(`INSERT INTO ITEMS (productid, serialnumber, receiveddate, phoneno,simnumber) VALUES (1,'SERIAL005','2025-02-08','64220889809','20000330005')`);
    } 
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
};

module.exports = createTableIfNotExists;