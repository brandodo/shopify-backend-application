const express = require("express");
const cors = require("cors");
const app = express();

const inventoryRoutes = require("./routes/inventories");
const warehouseRoutes = require("./routes/warehouse");

app.use(express.json());
app.use(cors());

// app.use("/inventory", inventoryRoutes);
app.use("/warehouse", warehouseRoutes);

app.listen(8080, function () {
  console.log("CORS-enabled web server listening on port 8080");
});
