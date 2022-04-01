const {Model, DataTypes} = require('sequelize')

class Usuario extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.CHAR,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,

        },{sequelize,tableName:'usuarios'})
    }
}

module.exports = Usuario