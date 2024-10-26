const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const productMiddleware = require('../middleware/productMiddleware');

/* Post parsing */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* GET */
router.get('/products', productControllers.getProducts);
// router.get('/products/:id', jsonParser, productControllers.getProductById);

/* POST */
/* added parser!!! */
router.post('/products', jsonParser,
  productMiddleware.nameValidation,
  productMiddleware.priceValidation,
  productMiddleware.imgValidation,
  productControllers.postProducts);

/* UPDATE */
router.put('/products/update/:name', jsonParser,
  productMiddleware.nameValidation,
  productMiddleware.priceValidation,
  productMiddleware.imgValidation,
  productControllers.updateProducts);

  router.put('/products/update/disable/:name', jsonParser, productControllers.disableProduct);

/* DELETE */
router.delete('/products/delete/:name', jsonParser, productControllers.deleteProducts);

/* RESET DB */
router.delete('/products/reset', productControllers.resetProducts);

module.exports = router;
