const {Model, DataTypes} = require('sequelize')

class Contato extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            mensagem: DataTypes.TEXT,

        },{sequelize,tableName:'contatos'})
    }
}

module.exports = Contato