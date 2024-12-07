const pool = require('./db');

// Consulta para obtener la fecha de la base de datos

const getDate = async () => {
    const consulta = 'SELECT NOW()';
    const result = await pool.query(consulta);
    return result.rows[0].now
}

module.exports = { getDate }