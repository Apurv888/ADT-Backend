const db = require("../config/db");

// Get all users
exports.getProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products");
    let response = {status : 200, length : products.length, products, message: "Products fetched successfully!"};
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};


exports.addProduct = async (req,res) => { 
  try {
    const { productName, productDescription } = req.body;

    console.log(req.body);
    
    

    if(!productDescription || !productName){
      return res.status(400).json({ message: "All fields are required!" });
    }

    const [result] = await db.query("INSERT INTO PRODUCTS (productname,productdescription) VALUES (?,?)",[productName,productDescription]);
    
    let response = {status : 200, productId : result.insertId, message: "Product inserted successfully!"};
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
 }