const express = require('express')
const routes = express.Router()
const loginController = require('../controller/loginController')
const passport = require('../config/passport')

routes.get('/', loginController.abreLogin)

routes.post('/', loginController.logar)

routes.get('/sair', loginController.logout)

module.exports = routes
