const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test de conexión
pool.connect()
  .then(() => console.log('✅ PostgreSQL conectado correctamente'))
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));

module.exports = pool;