const express = require('express');

const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

/* Post parsing */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* GET */
router.get('/products', productsControllers.getProducts);

/* POST */
/* added parser!!! */
router.post('/products', jsonParser, productsControllers.postProducts);

/* UPDATE */
router.put('/products', jsonParser, productsControllers.updateProducts);

/* DELETE */
router.delete('/products/:id', jsonParser, productsControllers.deleteProducts);

module.exports = router;
