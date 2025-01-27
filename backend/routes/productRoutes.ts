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
  uploadProductImage,
  resetProducts,
  getProductById } from '../controllers/productControllers'

const productsRouter = Router();

import multer from 'multer';

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
productsRouter.put('/products/update/:id', jsonParser,
  // productMiddleware.nameValidation,
  // productMiddleware.priceValidation,
  // productMiddleware.imgValidation,
  updateProducts);

productsRouter.put('/products/update/disable/:id', jsonParser, disableProduct);

productsRouter.post('/products/upload', multer().single('upload_image'), jsonParser, uploadProductImage);

/* DELETE */
productsRouter.delete('/products/delete/:id', jsonParser, deleteProducts);

/* RESET DB */
productsRouter.delete('/products/reset', resetProducts);

// module.exports = router;
export default productsRouter;
