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
app.use(cors({ origin: ANGULAR_URI, }))

/* Request/response */
// app.get("/", (req, res, next) => {
//   console.log("I've been triggered...")
// });

app.listen(PORT, () => {
  console.log(`* Server running on port ${PORT}`);
})

/* Routes */
const products = require('./routes/productsRoutes');
app.use('/api', products);
