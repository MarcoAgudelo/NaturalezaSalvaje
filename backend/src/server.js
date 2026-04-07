require('dotenv').config();
const app = require('./app');
require('./config/db'); // conexión DB

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});