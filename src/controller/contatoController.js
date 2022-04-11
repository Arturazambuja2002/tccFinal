const Contato = require('../model/Contato')

module.exports = {
    async abrecontato(req,res){
        
        res.render('contato.ejs',{ "msg": req.flash("msg")})
    },

    async add(req,res){
        const {nome,email,mensagem} = req.body
        const contato = await Contato.create({nome,email,mensagem}).then(
            (contato) => {
            req.flash('msg','Sua mensagem foi enviada, aguarde e será respondida!')
            res.redirect('/contato')
        }, (err) => {
            console.log(err)
            req.flash('msg', "Problemas ao enviar a mensagem!")
            res.redirect('/contato')
        })
        
    }
}