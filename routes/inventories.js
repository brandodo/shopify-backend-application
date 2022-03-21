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

// Edit Inventory Item
router.put("/edit/:inventoryId/:warehouseId", (req, res) => {
  const { itemName, itemDescription, category, status, quantity, warehouse } =
    req.body;

  const { inventoryId, warehouseId } = req.params;

  fs.readFile(INVENTORY_DATA, (err, data) => {
    if (err) throw err;

    const currentData = JSON.parse(data);
    const invIndex = currentData.findIndex(
      (video) => video.id === inventoryId && video.warehouseID === warehouseId
    );

    if (invIndex === -1) {
      res.status(404).send("Inventory or Warehouse not found!");
    } else {
      const inventoryToUpdate = currentData[invIndex];
      inventoryToUpdate.itemName = itemName;
      inventoryToUpdate.description = itemDescription;
      inventoryToUpdate.category = category;
      inventoryToUpdate.status = status;
      inventoryToUpdate.quantity = quantity;
      inventoryToUpdate.warehouseName = warehouse;

      fs.writeFile(INVENTORY_DATA, JSON.stringify(currentData), (err) => {
        if (err) throw err;

        console.log("Inventory updated!");
        res.status(200).send(inventoryToUpdate);
      });
    }
  });
});

module.exports = router;
