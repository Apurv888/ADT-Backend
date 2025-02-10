const db = require("../config/db");

// Get all items
exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query("SELECT * from items");
    let response = {status : 200, length : items.length, items, message: "Items fetched successfully!"};
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

// insert an item
exports.insertItem = async (req,res) => {
  const { productId, serialNumber, receivedDate, phoneNo, simNumber } = req.body;

  try {
    const insertArray = await db.query(`INSERT INTO ITEMS (productid, serialnumber, receiveddate, phoneno,simnumber) VALUES (?,?,?,?,?)`,[productId,serialNumber,receivedDate,phoneNo,simNumber]);

    if(insertArray[0].affectedRows > 0){
      let response = {status : 200, isInserted:true, message: "Item inserted successfully!"};
      res.status(200).json(response);
    }
    else{
      let response = {status : 400, isInserted:false, message: "Item Insert Error!"};
      res.status(400).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
}
