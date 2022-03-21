const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const INVENTORY_DATA = "./data/inventories.json";