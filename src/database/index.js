const Sequelize = require('sequelize')
const config = require('../config/database')
const Projeto = require('../model/Projeto')
const Usuario = require('../model/Usuario')
const Fundo = require('../model/Fundo')
const Gasto = require('../model/Gasto')

const conexao = new Sequelize(config);

Projeto.init(conexao);
Usuario.init(conexao);
Fundo.init(conexao);
Gasto.init(conexao)

Projeto.associate(conexao.models);
Fundo.associate(conexao.models);

module.exports = conexao