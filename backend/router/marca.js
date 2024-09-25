const express = require('express');
const MarcaController = require('../controller/MarcaController');

const router = express.Router();

router
    .get('/api/marca', MarcaController.List)                               // Lista todas as marcas
    .get('/api/marca/:CodigoMarca', MarcaController.GetOne)               // Busca uma marca específica pelo CódigoMarca
    .post('/api/marca', MarcaController.Create)                          // Cria uma nova marca
    .put('/api/marca/:CodigoMarca', MarcaController.Update)             // Atualiza uma marca existente
    .delete('/api/marca/:CodigoMarca', MarcaController.Delete)         // Deleta uma marca pelo CódigoMarca

module.exports = router;