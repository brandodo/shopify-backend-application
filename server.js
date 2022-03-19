const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
});
