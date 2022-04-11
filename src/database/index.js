const Sequelize = require('sequelize')
const config = require('../config/database')
const Projeto = require('../model/Projeto')
const Usuario = require('../model/Usuario')
const Fundo = require('../model/Fundo')
const Contato = require('../model/Contato')

const conexao = new Sequelize(config);

Projeto.init(conexao);
Usuario.init(conexao);
Fundo.init(conexao);
Contato.init(conexao)

Projeto.associate(conexao.models);
Fundo.associate(conexao.models);

module.exports = conexao