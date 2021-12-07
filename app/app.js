var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
var u = fs.readFileSync('users.json');
var obj = JSON.parse(u);

console.log(obj.username);

let data = {
  "list": [
    {username:"noha","password":"abc"},
    {"username":"shahenda","password":"abc"},
    {"username":"ahmed","password":"abc"}
 ]}

 for (var x in obj) {
   if(obj[x].username =="noha"){
    console.log('found')
 }
}

app.get('/', function(req, res){
  res.render('index', {tittle: "express"})
});

app.post('/', function(req, res){
  
  var name = req.body.username;
  var pass = req.body.password;

  if(data.list.find( record => record.username === name)){
    if(data.list.find( record => record.password === pass)){
      res.render('home', {tittle: "express"})
    }
  }
  else{
    console.log('user not found!');
  }
});

app.get('/home', function(req, res){
  res.render('home', {tittle: "express"})
});


app.get('/reset_pass', function(req, res){
  res.render('reset_pass', {tittle: "express"})
});

app.post('/reset_pass', function(req, res){
  
  var name = req.body.username;
  var pass = req.body.new_psw;

 
  res.render('index', {tittle: "express"})
  
});



app.listen(3000);