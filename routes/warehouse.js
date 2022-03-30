const express = require("express");
const router = express.Router();
const warehouses = require("../data/warehouses.json");
const inventory = require("../data/inventories.json");
const fs = require("fs");
// const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");
const WAREHOUSE_DATA = "./data/warehouses.json";
const INVENTORIES_DATA = "./data/inventories.json";

// Get single warehouse by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(WAREHOUSE_DATA, "utf-8", (err, data) => {
    if (err) throw err;

    const currentData = JSON.parse(data);
    const [warehouseFound] = currentData.filter(
      (warehouse) => warehouse.id === id
    );
    console.log(currentData);
    res.status(200).json(warehouseFound);
  });
});

// Get inventory for a given warehouse by warehouse ID
router.get("/:id/inventory", (req, res) => {
  let { id } = req.params;
  //   const warehouseFound = getWarehouse(id);
  const warehouseInventory = inventory.filter((item) => {
    return item.warehouseID === id;
  });
  res.status(200).json(warehouseInventory);
});

// Get list of all warehouses
router.get("/", (req, res) => {
  res.status(200).json(warehouses);
});

// Edit Warehouse
router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const {
    warehouseName,
    address,
    city,
    country,
    name,
    position,
    phone,
    email,
  } = req.body;

  fs.readFile(WAREHOUSE_DATA, "utf-8", (err, data) => {
    if (err) throw err;

    const currentData = JSON.parse(data);
    const warehouseIndex = currentData.findIndex(
      (warehouse) => warehouse.id === id
    );

    if (warehouseIndex === -1) {
      res.status(404).send("Warehouse not found!");
    }

    const warehouseData = currentData[warehouseIndex];
    warehouseData.name = warehouseName;
    warehouseData.address = address;
    warehouseData.city = city;
    warehouseData.country = country;
    warehouseData.contact.name = name;
    warehouseData.contact.position = position;
    warehouseData.contact.phone = phone;
    warehouseData.contact.email = email;

    fs.writeFile(WAREHOUSE_DATA, JSON.stringify(currentData), (err) => {
      if (err) throw err;

      console.log("Warehouse updated!");
      res.status(200).send(warehouseData);
    });
  });
});

//Delete a Warehouse

router.delete("/edit/:id", (req, res) => {
  const { id } = req.params;

  let warehouseData, inventoriesData;
  try {
    warehouseData = JSON.parse(fs.readFileSync(WAREHOUSE_DATA, "utf-8"));
    inventoriesData = JSON.parse(fs.readFileSync(INVENTORIES_DATA, "utf-8"));
  } catch (err) {
    console.error(err);
    return res.send(err);
  }

  const warehouseData2 = warehouseData.filter((x) => x.id !== id);
  const inventoriesData2 = inventoriesData.filter((x) => x.warehouseID !== id);

  try {
    fs.writeFileSync(WAREHOUSE_DATA, JSON.stringify(warehouseData2, null, 2));
    fs.writeFileSync(
      INVENTORIES_DATA,
      JSON.stringify(inventoriesData2, null, 2)
    );
  } catch (err) {
    console.error(err);
    return res.send(err);
  }

  console.log("Warehouse deleted!");
  res.status(200).send({
    removed_warehouse: warehouseData.length - warehouseData2.length,
    removed_inventories: inventoriesData.length - inventoriesData2.length,
  });
});

module.exports = router;
