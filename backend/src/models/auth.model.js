const pool = require("../config/db");

const obtenerUsuarioPorEmail = async (email) => {
    const query = `
        select *
        from usuarios
        where email = $1;
        `;
        
        const values = [email];
        const result = await pool.query(query, values);
        return result.rows[0];  
};

const crearUsuario = async ({nombres, apellidos, email, password}) => {
    const query = `
        insert into usuarios (nombres, apellidos, email, password)
        values ($1, $2, $3, $4)
        returning id, nombres, apellidos, email;
        `;

    const values = [nombres, apellidos, email, password];

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    obtenerUsuarioPorEmail,
    crearUsuario
};