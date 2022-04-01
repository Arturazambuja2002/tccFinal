const express = require('express')

const routes = express.Router()

const projetoController = require('../controller/projetoController')

//LIST
routes.get('/', projetoController.list)

routes.post('/', projetoController.filtro)

routes.get('/add', projetoController.abreprojeto)

routes.post('/add', projetoController.add)

routes.get('/edit/:id', projetoController.abreedit)

routes.post('/edit/:id', projetoController.edit)

routes.get('/del/:id', projetoController.del)

module.exports = routes
