const usuario = require('../model/Usuario');
var bcrypt = require('bcrypt')

var passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    usuario.findByPk(id).then(function(user,err){
        done(err,user)
    })
})


passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField: 'senha',
    passReqToCallback:true
},
  function(req,username, password, done) {
    usuario.findOne({where:{email: username}}).then(function(user,err){
        if(err){
            return done(err)
        }
        if(!user){
            return done(null,false, req.flash('msg',"Usuario não existe!"))
        }else{
            bcrypt.compare(password, user.senha, function(err, result){
                if(result == true){
                    return done(null,user)
                }else{
                    return done(null,false, req.flash('msg',"Senha incorreta!"))
                }
            })
        }
        /*if(user.senha != password){
            return done(null,false, req.flash('msg',"Senha incorreta!"))
        }

        return done(null,user)*/
    })}

));

module.exports = passport