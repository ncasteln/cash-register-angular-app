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
import multer from 'multer';
import { imageStorage } from '../storage/imageStorage';

const productsRouter = Router();

/* Upload images */
const imageUpload = multer({ storage: imageStorage })

/* GET */
productsRouter.get('/products', getProducts);
productsRouter.get('/products/:id', getProductById);
productsRouter.get('/products/uploads/:id', getImage);

/* POST */
productsRouter.post('/products/create', imageUpload.single('imageFile'), postProducts);

/* UPDATE */
productsRouter.put('/products/update/:id', imageUpload.single('imageFile'), updateProducts);
productsRouter.put('/products/update/disable/:id', disableProduct);

/* DELETE */
productsRouter.delete('/products/delete/:id', deleteProducts);

/* RESET DB */
productsRouter.delete('/products/reset', resetProducts);

export default productsRouter;
