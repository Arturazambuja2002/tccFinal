const Fundo = require('../model/Fundo')
const Projeto = require('../model/Projeto')

module.exports = {
    async abreadd(req,res){
        
        res.render('adicionarfundos.ejs',{'projeto_id': req.params.id, 'Usuario': req.user, "msg": req.flash("msg")})
    },

    async add(req,res){
        const {projeto_id,nome, valor, descricao} = req.body
        const projeto = await Projeto.findByPk(projeto_id)
        const fundos = await Fundo.findAll({where:{
            projeto_id:projeto_id
        }})
        var valortotal = 0;
        fundos.forEach(function(f){
            valortotal = valortotal+f.valor
        })
        if(projeto.custo>=valortotal+valor){
            const fundo = await Fundo.create({nome,valor,descricao,projeto_id}).then(
                (fundo) => {
                req.flash('msg', fundo.nome +  'foi adicionado com sucesso!')
                res.redirect('/editarprojeto/' + projeto_id )
            }, (err) => {
                console.log(err)
                req.flash('msg', "Problemas ao adicionar o projeto!")
                res.redirect('/adicionarfundos/' + projeto_id)
            })
            
        }else{
            req.flash('msg', "Valor maior que o necessário para o projeto!")
            res.redirect('/adicionarfundos/' + projeto_id)
        }
        
    },
    async del(req,res){
        const id = req.params.id
    
        let fundos = await Fundo.findByPk(id, {include: 'donoProjeto'});

        var projeto = await Projeto.findByPk(fundos.donoProjeto.id)
        await Fundo.destroy({
            where:{id:id}
        }). then(
            (docs) =>{
                req.flash('msg', 'O fundo foi deletado com sucesso!')
                res.redirect('/editarprojeto/' + projeto.id)
                //res.redirect('/editarprojeto/<%=projeto.id%>')
        },
            (err) => {
                req.flash('msg', 'Problema ao deletar o projeto!')
                res.redirect('/editarprojeto' + projeto.id) 
        })
    }
}