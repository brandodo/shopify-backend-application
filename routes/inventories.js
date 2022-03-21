const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const INVENTORY_DATA = "./data/inventories.json";

// Add New Inventory Item
router.post("/add", (req, res) => {
  const { itemName, itemDescription, category, status, quantity, warehouse } =
    req.body;

  const inventoryJSON = {
    id: uuidv4(),
    warehouseID: uuidv4(),
    warehouseName: warehouse,
    itemName: itemName,
    description: itemDescription,
    category: category,
    status: status,
    quantity: quantity,
  };

  fs.readFile(INVENTORY_DATA, "utf-8", (err, data) => {
    if (err) throw err;

    const currentData = JSON.parse(data);
    currentData.push(inventoryJSON);

    fs.writeFile(INVENTORY_DATA, JSON.stringify(currentData), (err) => {
      if (err) throw err;

      console.log("New inventory item added!");
      res.status(200).send(inventoryJSON);
    });
  });
});

module.exports = router;
