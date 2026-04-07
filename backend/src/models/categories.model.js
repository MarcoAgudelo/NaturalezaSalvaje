const pool = require('../config/db');

const obtenerCategorias = async () => {
    const query = 'SELECT * FROM categorias ORDER BY nombre ASC';
    const result = await pool.query(query);
    return result.rows;
};

module.exports= {
    obtenerCategorias
};
