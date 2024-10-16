const express = require('express');

const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

/* Post parsing */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* GET */
router.get('/products', productsControllers.getProducts);
// router.get('/products/:id', jsonParser, productsControllers.getProductById);

/* POST */
/* added parser!!! */
router.post('/products', jsonParser, productsControllers.postProducts);

/* UPDATE */
router.put('/products/update/:name', jsonParser, productsControllers.updateProducts);

/* DELETE */
router.delete('/products/delete/:name', jsonParser, productsControllers.deleteProducts);

module.exports = router;
