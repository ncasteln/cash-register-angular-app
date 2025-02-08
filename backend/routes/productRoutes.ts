import { Router } from 'express'
import {
  getProducts,
  postProducts,
  updateProducts,
  deleteProducts,
  disableProduct,
  resetProducts,
  getProductById,
  getImage } from '../controllers/productControllers'

const productsRouter = Router();

import multer from 'multer';
import { imageStorage } from '../storage/imageStorage';

const imageUpload = multer({ storage: imageStorage })

/* GET */
productsRouter.get('/products', getProducts);
productsRouter.get('/products/:id', /* jsonParser, */ getProductById);
productsRouter.get('/products/uploads/:id', /* jsonParser, */ getImage);

/* POST */
productsRouter.post('/products', /* jsonParser, */ postProducts);

/* UPDATE */
productsRouter.put('/products/update/:id', imageUpload.single('img'), /* jsonParser, */ updateProducts);
productsRouter.put('/products/update/disable/:id', /* jsonParser, */ disableProduct);

/* DELETE */
productsRouter.delete('/products/delete/:id', /* jsonParser, */ deleteProducts);

/* RESET DB */
productsRouter.delete('/products/reset', resetProducts);

// module.exports = router;
export default productsRouter;
