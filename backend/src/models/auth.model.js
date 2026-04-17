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

const crearUsuario = async ({nombres, apellidos, email, password, telefono}) => {
    const query = `
        insert into usuarios (nombres, apellidos, email, password, telefono)
        values ($1, $2, $3, $4, $5)
        returning id, nombres, apellidos, email;
        `;

    const values = [nombres, apellidos, email, password, telefono];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const obtenerUsuarioPorGoogleId = async (google_id) => {
    const query = `
        select *
        from usuarios
        where google_id = $1;
        `;

    const values = [google_id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const crearUsuariosPorGoogleId = async ({nombres, apellidos, email, google_id}) => {
    const query = `
        insert into usuarios (nombres, apellidos, email, google_id)
        values ($1, $2, $3, $4)
        returning id, nombres, apellidos, email, google_id;
        `;

    const values = [nombres, apellidos, email, google_id];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const obtenerUsuarioPorId = async (id) => {
    const query = `
        select id, nombres, apellidos, email, rol, google_id
        from usuarios
        where id = $1;
        `;

    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    obtenerUsuarioPorEmail,
    crearUsuario,
    obtenerUsuarioPorGoogleId,
    crearUsuariosPorGoogleId,
    obtenerUsuarioPorId
};