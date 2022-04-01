const express = require('express')
const app = express();
var porta = process.env.PORT ||  3000; 
var projetoRoute = require('./routes/projetoRoute')
var usuarioRoute = require('./routes/usuarioRoute')
var loginRoute = require('./routes/loginRoute')
const autenticacao = require('./config/autenticacao')

const path = require('path')
const flash = require('req-flash')
const connectFlash = require('connect-flash')
var session = require('express-session')
const passport = require('passport');
const res = require('express/lib/response');
const usuarioController = require('./controller/usuarioController');
const projetoController = require('./controller/projetoController');

require('./database/index')

app.use(session({
    secret:'123',
    resave:true,
    saveUninitialized:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(connectFlash())

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(path.join("src","public")))

//app.use('/projeto', projetoRoute)
//app.use('/usuario', autenticacao.autenticacao() ,usuarioRoute)

//Inicio
app.get('/', function(req, res){
    res.render('inicio.ejs')
})

//Login
app.use('/login', loginRoute)

//Cadastro
app.get('/cadastrar',function(req, res){
    res.render('cadastrar.ejs')
})
app.post('/cadastrar', usuarioController.add)

//Home
app.get('/home', autenticacao.autenticacao(),function(req, res){
    res.render('home.ejs',{Usuario: req.user})
})
app.get('/sobre',function(req, res){
    res.render('sobre.ejs')
})
app.get('/contato',function(req, res){
    res.render('contato.ejs')
})

//Projetos
app.get('/projetos' , autenticacao.autenticacao() ,projetoController.list)
app.get('/novoprojeto' , autenticacao.autenticacao() ,function(req, res){
    res.render('novoprojeto.ejs')
})
app.post('/novoprojeto',autenticacao.autenticacao(),projetoController.add)

app.listen(porta)