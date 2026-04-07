const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const productosRoutes = require('./routes/products.routes');
app.use('/api', productosRoutes);

const categoriasRoutes = require('./routes/categories.routes');
app.use('/api', categoriasRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando 🔥' });
});

module.exports = app;