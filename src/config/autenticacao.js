exports.autenticacao = function autenticacao(){
    return function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('msg', "Você deve logar primeiro para acessar esse link!")
        res.redirect("/login")
    }
}