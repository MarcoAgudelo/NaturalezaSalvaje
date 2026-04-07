const express = require('express');
const router = express.Router();
const { getCategorias } = require('../controllers/categories.controller');

router.get('/categorias', getCategorias);

module.exports = router;