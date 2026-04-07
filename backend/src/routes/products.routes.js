const express = require('express');
const router = express.Router();
const { getProductos,
        getProductosPorCategoria,
        getProductosPorId } = require('../controllers/products.controller');

router.get('/productos', getProductos);

router.get('/productos/categoria/:id', getProductosPorCategoria);

router.get('/productos/:id', getProductosPorId);

module.exports = router;