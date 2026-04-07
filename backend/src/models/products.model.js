const pool = require('../config/db');

const obtenerProductos = async () => {
    const query = `
    SELECT 
      p.id,
      p.nombre,
      p.precio,
      TO_CHAR(p.precio, 'FM999G999G999') AS precio_formato,
      p.imagen,
      c.id AS categoria_id,
      c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    ORDER BY categoria ASC
  `;
    const result = await pool.query(query);
    return result.rows;
};
const obtenerProductosPorCategoria = async (categoria_id) => {
    const query = `
      SELECT
        p.id,
        p.nombre,
        p.precio,
        TO_CHAR(p.precio, 'FM999G999G999') AS precio_formato,
        p.imagen,
        c.nombre AS categoria
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE c.id = $1
      ORDER BY p.nombre ASC;
      `;

    const result = await pool.query(query, [categoria_id]);
    return result.rows;
};

const obtenerProductoPorId = async(id) => {
  const query = `SELECT p.id,
        p.nombre,
        p.precio,
        TO_CHAR(p.precio, 'FM999G999G999') AS precio_formato,
        p.imagen,
		p.descripcion,
		c.nombre AS categoria
		FROM productos p
		JOIN categorias c ON p.categoria_id = c.id
		WHERE p.id = $1;`;
  
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    obtenerProductos,
    obtenerProductosPorCategoria,
    obtenerProductoPorId 
};