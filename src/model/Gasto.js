const {Model, DataTypes} = require('sequelize')

class Gasto extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            custo: DataTypes.DOUBLE,
            categoria: DataTypes.STRING,

        },{sequelize,tableName:'gastos'})
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'usuario_id', as: 'dono'})
    }
}

module.exports = Gasto