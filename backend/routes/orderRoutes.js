const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
// const middleware = require('../middleware/middleware');

/* Post parsing */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* GET */
router.get('/order', orderControllers.getAllOrders);

/* POST */
router.post('/order', jsonParser, orderControllers.postOrder);

/* UPDATE */
// router.put('/order/update/:name', jsonParser, orderControllers.updateOrder);

/* DELETE */
// router.delete('/order/delete/:name', jsonParser, orderControllers.deleteOrder);

/* RESET DB */
// router.delete('/order/reset', orderControllers.resetProducts);

module.exports = router;
