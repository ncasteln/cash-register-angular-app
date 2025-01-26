// const express = require('express');
// const router = express.Router();

// import productControllers from '../controllers/productControllers'
// import productMiddleware from '../middleware/productMiddleware'

import { Router } from 'express'
import {
  getProducts,
  postProducts,
  updateProducts,
  deleteProducts,
  disableProduct,
  resetProducts,
  getProductById } from '../controllers/productControllers'

const productsRouter = Router();

/* Post parsing */
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json();

/* GET */
productsRouter.get('/products', getProducts);
productsRouter.get('/products/:id', jsonParser, getProductById);

/* POST */
/* added parser!!! */
productsRouter.post('/products', jsonParser,
  // productMiddleware.nameValidation,
  // productMiddleware.priceValidation,
  // productMiddleware.imgValidation,
  postProducts);

/* UPDATE */
productsRouter.put('/products/update/:name', jsonParser,
  // productMiddleware.nameValidation,
  // productMiddleware.priceValidation,
  // productMiddleware.imgValidation,
  updateProducts);

productsRouter.put('/products/update/disable/:name', jsonParser, disableProduct);

/* DELETE */
productsRouter.delete('/products/delete/:name', jsonParser, deleteProducts);

/* RESET DB */
productsRouter.delete('/products/reset', resetProducts);

// module.exports = router;
export default productsRouter;
