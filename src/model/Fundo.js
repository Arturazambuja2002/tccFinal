const {Model, DataTypes} = require('sequelize')

class Fundo extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            valor: DataTypes.DOUBLE,
            descricao: DataTypes.STRING,

        },{sequelize,tableName:'fundos'})
    }
    static associate(models){
        this.belongsTo(models.Projeto, {foreignKey: 'projeto_id', as: 'donoProjeto'})
    }
}

module.exports = Fundo