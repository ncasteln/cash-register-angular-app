const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

/* Variables */
const PORT = process.env.PORT;
const ANGULAR_URI = process.env.ANGULAR_URI;

/* MongoDB */
require('./database/dbConnection');

/* Cors */
app.use(cors({
  origin: ANGULAR_URI,
}))

/* Request/response */
app.get("/", (req, res) => {
  res.send("* Hi user\n");
});

app.listen(PORT, () => {
  console.log(`* Server running on port ${PORT}`);
})

/* Routes */
const products = require('./routes/products');
app.use('/api', products);
