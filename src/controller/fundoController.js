const Fundo = require('../model/Fundo')

module.exports = {
    async abreadd(req,res){
        
        res.render('adicionarfundos.ejs')
    },

    async add(req,res){
        const projeto_id = req.user.id;
        const {nome, valor, descricao} = req.body

        const fundo = await Fundo.create({nome,valor,descricao,projeto_id}).then(
            (fundo) => {
            req.flash('msg', fundo.nome +  'foi adicionado com sucesso!')
            res.redirect('/editarprojeto/:id')
        }, (err) => {
            req.flash('msg', "Problemas ao adicionar o projeto!")
            res.redirect('/adicionarfundos')
        })
        
    },
    async del(req,res){
        const id = req.params.id
        await Fundo.destroy({
            where:{id:id}
        }). then(
            () =>{
                req.flash('msg', 'O fundo foi deletado com sucesso!')
                res.redirect('/editarprojeto/:id')
        },
            (err) => {
                req.flash('msg', 'Problema ao deletar o projeto!')
                res.redirect('/editarprojeto') 
        })
    }
}