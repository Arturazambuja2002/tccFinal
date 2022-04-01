const express = require('express')

const routes = express.Router()

const usuarioController = require('../controller/usuarioController')

//LIST
routes.get('/', usuarioController.list)

routes.post('/', usuarioController.filtro)

routes.get('/add', usuarioController.abreadd)

routes.post('/add', usuarioController.add)

routes.get('/edit/:id', usuarioController.abreedit)

routes.post('/edit/:id', usuarioController.edit)

routes.get('/del/:id', usuarioController.del)

module.exports = routes