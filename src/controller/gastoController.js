const Gasto = require('../model/Gasto')

module.exports = {
    async list(req,res){
        
        return res.render('gastos.ejs')
    }
}