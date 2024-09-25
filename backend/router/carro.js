const express = require('express');
const CarroController = require('../controller/CarroController');

const router = express.Router();

router
    .get('/api/carro', CarroController.List)                       // Lista todos os carros
    .get('/api/carro/:Codigo', CarroController.GetOne)            // Busca um carro específico pelo Código
    .post('/api/carro', CarroController.Create)                  // Cria um novo carro
    .put('/api/carro/:Codigo', CarroController.Update)          // Atualiza um carro existente
    .delete('/api/carro/:Codigo', CarroController.Delete)      // Deleta um carro pelo Código

module.exports = router;