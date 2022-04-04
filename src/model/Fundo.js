const {Model, DataTypes} = require('sequelize')

class Fundo extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
            descricao: DataTypes.STRING,

        },{sequelize,tableName:'fundos'})
    }
}

module.exports = Fundo