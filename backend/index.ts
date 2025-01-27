import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import productsRouter from './routes/productRoutes';
import connectToDb from './database/dbConnection';

const app = express();

config();

/* Variables */
const PORT = process.env.PORT;
const ANGULAR_URI = process.env.ANGULAR_URI;

/* MongoDB */
connectToDb();

/* Cors */
app.use(cors({ origin: ANGULAR_URI, }))

/* Listen for requests */
app.listen(PORT, () => { console.log(`* Server running on port ${PORT}`); })

/* Routes */
app.use('/api', productsRouter);

// const order = require('./routes/orderRoutes')
// app.use('/api', order);
