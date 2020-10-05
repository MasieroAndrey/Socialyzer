const eventos = require('express').Router();

const controllerEvento = require('../controller/controllerevento')();





eventos.get('/', controllerEvento.listarEventos);
eventos.post('/', controllerEvento.criarEvento)
eventos.put('/', controllerEvento.alterarEvento)
eventos.delete('/:Idevento', controllerEvento.excluirEvento)

// eventos.get('/buscar/:idcasa', controllerEvento.buscarEventos)
// eventos.get('/calcular', controllerEvento.calcular)
// eventos.get('/calcularluz', controllerEvento.calcularluz)
// eventos.get('/somatorioluz', controllerEvento.somatorioluz)

module.exports = eventos;