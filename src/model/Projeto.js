const {Model, DataTypes} = require('sequelize')

class Projeto extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            custo: DataTypes.DOUBLE,
            categoria: DataTypes.STRING,

        },{sequelize,tableName:'projetos'})
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'usuario_id', as: 'dono'})
    }
}

module.exports = Projeto