const Fundo = require('../model/Fundo')
const Projeto = require('../model/Projeto')

module.exports = {
    async abreadd(req,res){
        
        res.render('adicionarfundos.ejs',{'projeto_id': req.params.id})
    },

    async add(req,res){
        const {projeto_id,nome, valor, descricao} = req.body
        console.log(projeto_id,nome, valor, descricao)
        const fundo = await Fundo.create({nome,valor,descricao,projeto_id}).then(
            (fundo) => {
            req.flash('msg', fundo.nome +  'foi adicionado com sucesso!')
            res.redirect('/editarprojeto/' + projeto_id )
        }, (err) => {
            console.log(err)
            req.flash('msg', "Problemas ao adicionar o projeto!")
            res.redirect('/adicionarfundos/' + projeto_id)
        })
        
    },
    async del(req,res){
        const id = req.params.id
        await Fundo.destroy({
            where:{id:id}
        }). then(
            (docs) =>{
                req.flash('msg', 'O fundo foi deletado com sucesso!')
                res.redirect('/projetos')
        },
            (err) => {
                req.flash('msg', 'Problema ao deletar o projeto!')
                res.redirect('/projetos') 
        })
    }
}