const {Model, DataTypes} = require('sequelize')

class Projeto extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            custo: DataTypes.DOUBLE,
            categoria: DataTypes.STRING,

        },{sequelize,tableName:'projetos'})
    }
}

module.exports = Projeto