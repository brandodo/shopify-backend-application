const express = require("express");
const router = express.Router();
const warehouses = require("../JSONdata/warehouses.json");

// Get single warehouse by ID
router.get("/:id", (req, res) => {
	let { id } = req.params;
	const warehouseFound = getWarehouse(id);
	res.status(200).json(warehouseFound);
});

// Get inventory for a given warehouse by warehouse ID
router.get("/:id/inventory", (req, res) => {
	let { id } = req.params;
	const warehouseFound = getWarehouse(id);
	const warehouseInventory = inventory.filter((item) => {
		return item.warehouseID === warehouseFound?.id;
	});
	res.status(200).json(warehouseInventory);
});

// Get list of all warehouses
router.get("/", (req, res) => {
	res.status(200).json(warehouseData(warehouses));
});
