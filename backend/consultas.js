const pool = require('./db');

// Consulta para obtener la fecha de la base de datos

const getDate = async () => {
    const consulta = 'SELECT NOW()';
    const result = await pool.query(consulta);
    return result.rows[0].now
}

//Consultas de los viajes

const getViajes = async () => {
    const consulta = 'SELECT * FROM viajes';
    const result = await pool.query(consulta);
    return result.rows;
}

const addViaje = async (destino, presupuesto) => {
    const consulta = "INSERT INTO viajes (destino, presupuesto) VALUES ($1, $2)";
    await pool.query(consulta, [destino, presupuesto]);
}

const modificarViaje = async (id, destino, presupuesto) => {
    const consulta = "UPDATE viajes SET destino = $1, presupuesto = $2 WHERE id = $3 RETURNING *";
    const result = await pool.query(consulta, [destino, presupuesto, id]);

    if(result.rowCount == 0){
        throw {code: 404, message: "No se encontró el viaje con ese id"}
    }

    return result.rows
}

const eliminarViaje = async (id) => {
    const consulta = "DELETE FROM viajes WHERE id = $1";
    const result =await pool.query(consulta, [id]);
    if(result.rowCount == 0){
        throw {code: 404, message: "No se encontró el viaje con ese id"}
    }
}

const getViajePorId = async (id) =>{
    const consulta = "SELECT * FROM viajes WHERE id = $1";
    const result = await pool.query(consulta, [id]);
    console.log(result)

    if(result.rowCount == 0){
        throw {code: 404, message: "No se encontró el viaje con ese id"}
    }
    return result.rows;
}



//Consultas de los equipamientos

const getEquipamientos = async () => {
    const consulta = 'SELECT * FROM equipamiento';
    const result = await pool.query(consulta);
    return result.rows;
}

const getEquipamientoPorId = async (id) => {
    const consulta = 'SELECT * FROM equipamiento WHERE id = $1';
    const result = await pool.query(consulta, [id]);
    if(result.rowCount == 0){
        throw {code: 404, message: "No se encontró el equipamiento con ese id"}
    }
    return result.rows;
}

const addEquipamiento = async (nombre) => {
    const consulta = "INSERT INTO equipamiento (nombre) VALUES ($1)";
    await pool.query(consulta, [nombre]);
}

const modificarEquipamiento = async (id, nombre) => {
    const consulta = "UPDATE equipamiento SET nombre = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(consulta, [nombre, id]);
    if(result.rowCount == 0){
        throw {code: 404, message: "No se encontró el equipamiento con ese id"}
    }
    return result.rows;
}

const eliminarEquipamiento = async (id) => {
    const consulta = "DELETE FROM equipamiento WHERE id = $1";
    const result = await pool.query(consulta, [id]);
    if(result.rowCount == 0){
        throw {code: 404, message: "No se encontró el equipamiento con ese id"}
    }
}


module.exports = { getDate, getViajes, addViaje, modificarViaje, eliminarViaje, getViajePorId,
    getEquipamientos, addEquipamiento, modificarEquipamiento, eliminarEquipamiento, getEquipamientoPorId
 };