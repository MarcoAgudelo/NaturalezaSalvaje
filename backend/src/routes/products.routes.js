const express = require('express');
const router = express.Router();
const { getProductos,
        getProductosPorCategoria,
        getProductosPorId } = require('../controllers/products.controller');

router.get('/', getProductos);

router.get('/categoria/:id', getProductosPorCategoria);

router.get('/:id', getProductosPorId);

module.exports = router;