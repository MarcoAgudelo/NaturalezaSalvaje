const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/products.routes');
const categoriasRoutes = require('./routes/categories.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'API funcionando 🔥' });
});


app.use('/productos', productosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/auth', authRoutes);


module.exports = app;