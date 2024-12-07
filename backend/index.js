const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getDate, getViajes, addViaje, modificarViaje, eliminarViaje, getViajePorId, 
    getEquipamientos, addEquipamiento, modificarEquipamiento, eliminarEquipamiento, getEquipamientoPorId
 } = require('./consultas');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () =>{ console.log('Servidor corriendo en el puerto ' + port) });

app.get('/', async (req, res) => {
    const date = await getDate();
    res.send(date);
});

//Rutas para los viajes

app.get("/viajes", async (req, res)=>{
    const viajes = await getViajes();
    res.json(viajes)
})

app.post("/viajes", async (req, res)=>{
    const { destino, presupuesto } = req.body;
    try {
        await addViaje(destino, presupuesto);
        res.status(201).send("Viaje añadido correctamente");
    } catch (error) {
        if(error.code == 23502){
            res.status(500).send("Error al añadir el viaje: Se necesita que añadas el valor de todos los campos");
        }
        else{
            res.status(500).send("Error al añadir el viaje" + error.detail);
        }
    }
})

app.put("/viajes/:id" , async (req, res)=>{
    const { destino, presupuesto } = req.body;
    const { id } = req.params;
    try {
        const viajeModificado = await modificarViaje(id, destino, presupuesto);
        res.status(200).json(viajeModificado);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})

app.delete("/viajes/:id" , async (req, res)=>{
    const { id } = req.params;
    try {
        await eliminarViaje(id);
        res.status(200).send("Viaje eliminado correctamente");
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})

app.get("/viajes/:id" , async (req, res)=>{
    const { id } = req.params;
    try {
        const viaje = await getViajePorId(id);
        res.status(200).json(viaje);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})


//Rutas para los equipamientos

app.get("/equipamientos", async (req, res)=>{
    const equipamientos = await getEquipamientos();
    res.json(equipamientos)
})

app.get("/equipamientos/:id" , async (req, res)=>{
    const { id } = req.params;
    try {
        const equipamiento = await getEquipamientoPorId(id);
        res.status(200).json(equipamiento);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})

app.post("/equipamientos", async (req, res)=>{
    const { nombre } = req.body;
    if(!nombre){
        res.status(500).send("Error al añadir el equipamiento: Se necesita que añadas el valor de todos los campos");
    }else{
        try {
            await addEquipamiento(nombre);
            res.status(201).send("Equipamiento añadido correctamente");
        } catch (error) {
            if(error.code == 23502){
                res.status(500).send("Error al añadir el equipamiento: Se necesita que añadas el valor de todos los campos");
            }
            else{
                res.status(500).send("Error al añadir el equipamiento" + error.detail);
            }
        }
    }


})

app.put("/equipamientos/:id" , async (req, res)=>{
    const { nombre } = req.body;
    const { id } = req.params;
    try {
        const equipamientoModificado = await modificarEquipamiento(id, nombre);
        res.status(200).json(equipamientoModificado);
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})

app.delete("/equipamientos/:id" , async (req, res)=>{
    const { id } = req.params;
    try {
        await eliminarEquipamiento(id);
        res.status(200).send("Equipamiento eliminado correctamente");
    } catch (error) {
        res.status(error.code).send(error.message);
    }
})