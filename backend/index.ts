import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import productsRouter from './routes/productRoutes';
import ordersRouter from './routes/orderRoutes';
import connectToDb from './database/dbConnection';
import path from 'path';
import bodyParser from 'body-parser'

const app = express();

config();

/* Variables */
const port = process.env.PORT;
if (!port) {
  console.error("* PORT not set")
  process.exit(1)
}

const frontend = process.env.FRONTEND;
if (!frontend) {
  console.error("* FRONTEND not set")
  process.exit(1)
}

/* MongoDB */
connectToDb();

/* Body parser */
app.use(bodyParser.json())

/* Cors */
app.use(cors({
  origin: frontend,
  credentials: true
}))

app.use((req, res, next) => {
  console.debug('ORIGIN:', req.headers.origin);
  next();
});

/* Setting static files for direct access */
app.use('uploads', express.static(path.join(__dirname, 'uploads')));

/* Listen for requests */
app.listen(port, () => { console.log(`* Server running on port ${port}`); })

/* Routes */
app.use('/api', productsRouter);
app.use('/api', ordersRouter);
