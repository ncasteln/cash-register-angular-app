import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import productsRouter from './routes/productRoutes';
import ordersRouter from './routes/orderRoutes';
import connectToDb from './database/dbConnection';
import path from 'path';
import bodyParser from 'body-parser'

const app = express();

/* Variables */
const env = process.env.NODE_ENV;
if (!env) {
  console.error("* NODE_ENV not set")
  process.exit(1)
}
const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

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
connectToDb(env);

/* Body parser */
app.use(bodyParser.json())

/* Cors */
app.use(cors({
  origin: frontend,
  credentials: true
}))

/* Setting static files for direct access */
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});


/* Listen for requests */
app.listen(port, () => { console.log(`
* Server running in [${env}] mode
* Port [${port}]
* Accepting connection from [${frontend}]`); })

/* Routes */
app.use('/api', productsRouter);
app.use('/api', ordersRouter);
