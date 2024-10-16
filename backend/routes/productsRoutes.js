const express = require('express');

const router = express.Router();

const productsControllers = require('../controllers/productsControllers');
const middleware = require('../middleware/middleware');

/* Post parsing */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* GET */
router.get('/products', productsControllers.getProducts);
// router.get('/products/:id', jsonParser, productsControllers.getProductById);

/* POST */
/* added parser!!! */
router.post('/products', jsonParser,
  middleware.nameValidation,
  middleware.priceValidation,
  middleware.imgValidation,
  productsControllers.postProducts);

/* UPDATE */
router.put('/products/update/:name', jsonParser,
  middleware.nameValidation,
  middleware.priceValidation,
  middleware.imgValidation,
  productsControllers.updateProducts);

/* DELETE */
router.delete('/products/delete/:name', jsonParser, productsControllers.deleteProducts);

module.exports = router;
