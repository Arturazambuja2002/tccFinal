const passport = require('../config/passport')

async function abreLogin(req,res) {
    res.render("login.ejs", {"msg": req.flash("msg")})
}

async function logout(req,res){
    req.logout()
    console.log('deslogado')
    res.redirect('/')
}

const logar = passport.authenticate("local",{
    successRedirect: "/projetos",
    failureRedirect: "/login",
    failureFlash:true
})

module.exports = {
    abreLogin,
    logar,
    logout
}