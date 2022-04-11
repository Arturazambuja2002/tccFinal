const Usuario = require('../model/Usuario')
const Projeto = require('../model/Projeto')
var bcrypt = require('bcrypt')

const {Op} = require('sequelize')

module.exports = {
    async list(req,res){
        const projetos = await Projeto.findAll({where:{
            usuario_id:req.user.id
        }})
        return res.render('perfil.ejs', {'Projetos':projetos, 'msg': req.flash('msg'), 'Usuario': req.user})
    },
    async filtro(req,res){
        let query = '%' + req.body.filtro + '%'
        const usuarios = await Usuario.findAll({
            where:{
                email:{
                    [Op.like]: query
                }
            }
        })
        return res.render('', {'Usuarios':usuarios, 'msg':req.flash('msg')})
    },
    async abreadd(req,res){
        res.render('/novoprojeto', {msg: req.flash('msg')})
    },
    async add(req,res){
        const nome = req.body.nome
        const cpf = req.body.cpf
        const email = req.body.email
        var senha = req.body.senha

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                senha = hash;
                Usuario.create({nome,cpf,email,senha}).then(
                    (usuario) => {
                    req.flash('msg', usuario.nome +  'foi adicionado com sucesso!')
                    res.redirect('/login')
                }, (err) => {
                    req.flash('msg', "Problemas ao adicionar o usuário!")
                    res.redirect('/cadastrar')
                })
            });
        });
       
    },
    async abreedit(req,res){
        const id = req.params.id
        const usuario = await Usuario.findByPk(id)
        const projetos = await Projeto.findAll({where:{
            usuario_id:req.user.id
        }})

        res.render('editarperfil.ejs',{'Usuario':usuario, 'Projetos': projetos, 'msg':req.flash('msg')})

    },
    async edit(req,res){
        const id = req.body.id;
        const usuario = await Usuario.findByPk(id)
        
        usuario.nome = req.body.nome
        usuario.cpf = req.body.cpf
        usuario.email = req.body.email
            usuario.save().then(
                (usuario) =>{
                    req.flash('msg', usuario.nome + 'foi alterado com sucesso!')
                    res.redirect('/perfil')
                },
                (err) =>{
                    req.flash('msg', 'Problema ao alterar o usuário!')
                    res.redirect('/perfil')    
                }
                )       
    },
    async del(req,res){
        const id = req.params.id
        await Usuario.destroy({
            where:{id:id}
        }). then(
            () =>{
                req.flash('msg', 'O usuário foi deletado com sucesso!')
                res.render('', {'msg': req.flash('msg')})
        },
            (err) => {
                req.flash('msg', 'Problema ao deletar o usuário!')
                res.render('', {'msg': req.flash('msg')}) 
        })
    }
}