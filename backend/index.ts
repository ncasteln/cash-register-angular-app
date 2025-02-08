import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import productsRouter from './routes/productRoutes';
import connectToDb from './database/dbConnection';
import path from 'path';
import bodyParser from 'body-parser'

const app = express();

config();

/* Variables */
const PORT = process.env.PORT;
const ANGULAR_URI = process.env.ANGULAR_URI;

/* MongoDB */
connectToDb();

/* Body parser */
app.use(bodyParser.json())

/* Cors */
app.use(cors({ origin: ANGULAR_URI, }))

/* Setting static files for direct access */
app.use('uploads', express.static(path.join(__dirname, 'uploads')));

/* Listen for requests */
app.listen(PORT, () => { console.log(`* Server running on port ${PORT}`); })

/* Routes */
app.use('/api', productsRouter);
