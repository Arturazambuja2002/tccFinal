const passport = require('../config/passport')

async function abreLogin(req,res) {
    res.render("login.ejs", {"msg": req.flash("msg")})
}

const logar = passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash:true
})

module.exports = {
    abreLogin,
    logar
}