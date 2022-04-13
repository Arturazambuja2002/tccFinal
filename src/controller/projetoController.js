const Projeto = require('../model/Projeto')
const Fundo = require('../model/Fundo')

const {Op} = require('sequelize')
const Usuario = require('../model/Usuario')

module.exports = {
    async list(req,res){
        const projetos = await Projeto.findAll({where:{
            usuario_id:req.user.id
        }})
        return res.render('projetos.ejs', {'Projetos':projetos, 'msg': req.flash('msg'), 'Usuario': req.user})
    },
    async filtro(req,res){
        let query = `%${req.body.filtro}%`
        
        const projetos = await Projeto.findAll({
            where:{
                nome: {
                    [Op.iLike]: query    
                }
            }
        })
        return res.render('projetos.ejs', {'Projetos':projetos, 'msg': req.flash('msg'), 'Usuario': req.user})
    },
    async abreprojeto(req,res){
        res.render('projetos.ejs',{"Projetos":[],'msg': req.flash('msg')})
    },
    async add(req,res){
        const usuario_id = req.user.id;
        const {nome, custo, categoria} = req.body

        const projeto = await Projeto.create({nome,custo,categoria,usuario_id}).then(
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
        const fundo = await Fundo.findAll({where:{
            projeto_id:req.params.id
        }})
        var valortotal = 0;
        fundo.forEach(function(f){
            valortotal = valortotal+f.valor
        })
        res.render('editaprojeto.ejs',{'projeto':projeto, 'valortotal':valortotal, 'Fundos':fundo,'msg':req.flash('msg'), 'Usuario': req.user})

    },
    async edit(req,res){
        const id = req.params.id;
        const projeto = await Projeto.findByPk(id)
        
                res.render('editardados.ejs', {'projeto':projeto, 'msg': req.flash('msg'), 'Usuario': req.user})
    
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
                res.redirect("/editarprojeto/"+id)
            },
            (err) =>{
                req.flash('msg', 'Problema ao alterar o projeto!')
                res.redirect("/editarprojeto/"+id)
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