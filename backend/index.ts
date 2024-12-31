// const express = require('express');
// const cors = require('cors');

import express from 'express';
import cors from 'cors';

const app = express();
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

// const orders = require('./routes/ordersRoutes')
// app.use('/api', orders);
