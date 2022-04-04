const Sequelize = require('sequelize')
const config = require('../config/database')
const Projeto = require('../model/Projeto')
const Usuario = require('../model/Usuario')
const Fundo = require('../model/Fundo')

const conexao = new Sequelize(config);

Projeto.init(conexao);
Usuario.init(conexao);
Fundo.init(conexao)

module.exports = conexao