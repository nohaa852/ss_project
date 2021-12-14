if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var express = require('express');
var path = require('path');
var app = express();
var bcrypt = require('bcrypt');

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport.config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//mongoose connection
async function main(){
  var mongoose = require('mongoose');

  var url = 'mongodb+srv://admin:admin@cluster0.uhgcb.mongodb.net/mydb?retryWrites=true&w=majority';
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
  
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
main().catch(console.sever);

// users
// var u = fs.readFileSync('users.json');
// var obj = JSON.parse(u);
// console.log(obj.username);

let users = [
    {username:"noha","password":"abc"},
    {"username":"shahenda","password":"abc"},
    {"username":"ahmed","password":"abc"}
 ]

app.get('/', function(req, res){
  res.render('index', {tittle: "express"})
});

app.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}))

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.render('home', {tittle: "express"})

  }
  next()
}


app.get('/register', function(req, res){
  res.render('register.ejs')
});

app.post('/register', async (req, res)=> {
try{
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  users.push({
    id: Date.now().toString(),
    name: req.body.name, 
    email: req.body.email, 
    password: hashedPassword
  })
  res.render('index', {tittle: "express"})
}catch{
  res.render('register', {tittle: "express"})
}
console.log(users)
})


app.get('/home', function(req, res){
  res.render('home', {tittle: "express"})
});


app.get('/reset_pass', function(req, res){
  res.render('reset_pass', {tittle: "express"})
});

app.post('/reset_pass', function(req, res){
  
  var name = req.body.username;
  var pass = req.body.new_psw;

  if(data.list.find( record => record.username === name)){

  }
  res.render('index', {tittle: "express"})
  
});



app.listen(3000);