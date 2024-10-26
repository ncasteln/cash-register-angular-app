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

/* Listen for requests */
app.listen(PORT, () => { console.log(`* Server running on port ${PORT}`); })

/* Routes */
const products = require('./routes/productRoutes');
app.use('/api', products);

const order = require('./routes/orderRoutes')
app.use('/api', order);
