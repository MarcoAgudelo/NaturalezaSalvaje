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

const guardarTokenRecuperacion = async ({usuarioId, tokenHash, expiraEn}) => {
    const query = `
        insert into password_reset_tokens (usuario_id, token_hash, expira_en)
        values ($1, $2, $3)
        returning id, usuario_id, expira_en, usado, creado_en;
        `;
    const values = [usuarioId, tokenHash, expiraEn];
    const result = await pool.query(query, values);
    return result.rows[0];  
};

const obtenerTokenDeRecuperacionPorHash = async (tokenHash) => {
    const query = `
        select *
        from password_reset_tokens
        where token_hash = $1
        limit 1;
        `;

    const values = [tokenHash];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const actualizarPasswordUsuario = async (usuarioId, passwordHash) => {
    const query = `
        update usuarios
        set password = $1
        where id = $2
        returning id, nombres, apellidos, email, rol;
        `;

    const values = [passwordHash, usuarioId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const marcarTokenComoUsado = async (tokenId) => {
    const query = `
        update password_reset_tokens
        set usado = true
        where id = $1
        returning id, usado;
        `;
    
    const values = [tokenId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    obtenerUsuarioPorEmail,
    crearUsuario,
    obtenerUsuarioPorGoogleId,
    crearUsuariosPorGoogleId,
    obtenerUsuarioPorId,
    guardarTokenRecuperacion,
    obtenerTokenDeRecuperacionPorHash,
    actualizarPasswordUsuario,
    marcarTokenComoUsado
};