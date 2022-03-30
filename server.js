const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { PORT, BACKEND_URL } = process.env;

const inventoryRoutes = require("./routes/inventories");
const warehouseRoutes = require("./routes/warehouse");

app.use(express.json());
app.use(cors());

app.use("/inventory", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
