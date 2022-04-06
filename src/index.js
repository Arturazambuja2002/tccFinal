const express = require('express')
const app = express();
var porta = process.env.PORT || 3000; 
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
const gastoController = require('./controller/gastoController')
const Fundo = require('./model/Fundo');
const fundoController = require('./controller/fundoController');
const req = require('express/lib/request');


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

//Gastos
app.get('/gastos', autenticacao.autenticacao(), gastoController.list)


//Projetos
app.get('/projetos' , autenticacao.autenticacao() ,projetoController.list)
app.get('/projeto/del/:id', autenticacao.autenticacao(), projetoController.del)

app.get('/novoprojeto' , autenticacao.autenticacao() ,function(req, res){
    res.render('novoprojeto.ejs', {Usuario: req.user})
})
app.post('/novoprojeto',autenticacao.autenticacao(),projetoController.add)

app.get('/editarprojeto/:id' , autenticacao.autenticacao(), projetoController.abreedit)

app.get('/editardadosprojeto/:id', autenticacao.autenticacao(), projetoController.edit)

app.post('/salvardados', autenticacao.autenticacao(), projetoController.salvar)

app.get('/adicionarfundos/:id' , autenticacao.autenticacao(), fundoController.abreadd)
app.post('/adicionarfundos' , autenticacao.autenticacao(), fundoController.add)
app.get('/fundos/del/:id', autenticacao.autenticacao(), fundoController.del)

app.get('/perfil',autenticacao.autenticacao() ,function(req, res){
    res.render('perfil.ejs', {Usuario:req.user})
})
app.get('/editarperfil/edit/:id',usuarioController.abreedit)
app.post('/editarperfil/edit/:id',usuarioController.edit)


//app.get('/perfil/<%=usuario.id%>' , autenticacao.autenticacao() ,function(req, res){
 //   Usuario.findByPk(req.params.id).then(function(projeto){
 //     res.render('perfil.ejs', {Usuario: usuario})
  //     }
   //    )})

    



app.listen(porta)