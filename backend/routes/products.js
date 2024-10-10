const express = require('express');
const router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.get('/products', productsControllers.getProducts);

// router.post

// router.delete

module.exports = router;
