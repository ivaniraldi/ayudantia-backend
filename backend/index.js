const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getDate } = require('./consultas');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () =>{ console.log('Servidor corriendo en el puerto ' + port) });

app.get('/', async (req, res) => {
    const date = await getDate();
    res.send(date);
});