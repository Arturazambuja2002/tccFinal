const Projeto = require('../model/Projeto')

const {Op} = require('sequelize')

module.exports = {
    async list(req,res){
        const projetos = await Projeto.findAll()
        return res.render('projetos.ejs', {'Projetos':projetos, 'msg': req.flash('msg')})
    },
    async filtro(req,res){
        let query = '%' + req.body.filtro + '%'
        const projetos = await Projeto.findAll({
            where:{
                nome:{
                    [Op.like]: query
                }
            }
        })
    },
    async abreprojeto(req,res){
        res.render('projetos.ejs',{"Projetos":[],'msg': req.flash('msg')})
    },
    async add(req,res){
        const {nome, custo, categoria} = req.body
        await Projeto.create({nome,custo,categoria}).then(
            (projeto) => {
            req.flash('msg', projeto.nome +  'foi adicionado com sucesso!')
            res.redirect('/projetos')
        }, (err) => {
            req.flash('msg', "Problemas ao adicionar o projeto!")
            res.redirect('/novoprojeto')
        })
    },
    async abreedit(req,res){
        const id = req.params.id
        console.log(id)
        const projeto = await Projeto.findByPk(id)

        res.render('editaprojeto.ejs',{'projeto':projeto, 'msg':req.flash('msg')})

    },
    async edit(req,res){
        const id = req.params.id;
        const projeto = await Projeto.findByPk(id)
        
                res.render('editardados.ejs', {'projeto':projeto, 'msg': req.flash('msg')})
    
    },
    async salvar(req,res){
        const id = req.body.id;
        const projeto = await Projeto.findByPk(id)
    
        projeto.nome = req.body.nome
        projeto.custo = req.body.custo
        projeto.categoria = req.body.categoria

        projeto.save().then(
            (projeto) =>{
                req.flash('msg', projeto.nome + 'foi alterado com sucesso!')
                res.render('editaprojeto.ejs',{'projeto':projeto, 'msg': req.flash('msg')})
            },
            (err) =>{
                req.flash('msg', 'Problema ao alterar o projeto!')
                res.render('editardados.ejs')
            })
    },

    async del(req,res){
        const id = req.params.id
        await Projeto.destroy({
            where:{id:id}
        }). then(
            () =>{
                req.flash('msg', 'O projeto foi deletado com sucesso!')
                res.redirect('/projetos')
        },
            (err) => {
                req.flash('msg', 'Problema ao deletar o projeto!')
                res.redirect('/projetos') 
        })
    }
}