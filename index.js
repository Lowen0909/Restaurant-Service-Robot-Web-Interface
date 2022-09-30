const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const passport=require('passport');
const{Check}=require('./auth/passport');
var bodyParser = require('body-parser');
var request = require('request-promise'); 
dotenv.config();
Check(passport);
var socketget;
//socket io
const PORT = process.env.PORT || 5000;
const http=require('http');
const server=http.createServer(app);
const{ Server }=require("socket.io");
const io=new Server(server);
server.listen(PORT,'0.0.0.0',()=>{
    console.log(`socket listening at ${PORT}`);
});

var seat=['A','B','C','D'];
var seat1=['empty','empty','empty','empty'];
//MENU SOKCKET
io.on('connection', function (socket) {
  socketget=socket;
  console.log("connect" + socket.id);
  socket.on('Sold_order',function(data){
    socket.broadcast.emit('table',{
        text: data.text
    });
  });
  socket.on('use',function(data){
    socket.broadcast.emit('change',{seatchange:data.tmp});
    var c=Object.fromEntries(JSON.parse(data.tmp));
    if(c[1]=='empty'){
      seat.push(c[0]);
      var A="A"
      var idx=c[0].charCodeAt(0)-A.charCodeAt(0);
      seat1[idx]='empty';
      console.log(seat1);
    }
  });
});


// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Database connected !'))
.catch(err => console.log('Cannot connect database'));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
const favicon = require('express-favicon');
app.use(favicon(__dirname + '/public/img/favicon.jpg'));
app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());
app.set('layout','backLayout')
app.set('view engine','ejs');
app.set('views','./public/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/',require('./routes/route'));

app.post('/seatStatus',function(req,res){
  res.send({seat:seat1});
});

app.use('/flask',async function (req, res) { 
  
  if(seat.length>0){
    var go=seat[seat.length-1];
    var p=seat.pop();
    if(p=='A'){
      seat1[0]='occupied';
    }else if(p=='B'){
      seat1[1]='occupied';
    }else if(p=='C'){
      seat1[2]='occupied';
    }else if(p=='D'){
      seat1[3]='occupied';
    }else{
      //do nothing
    }
    var change=[p,'occupied'];
    var temp=JSON.stringify(Object.entries(change));
    io.emit('change',{seatchange:temp});
    var data = { // this variable contains the data you want to send 
        data1: go, 
        data2: seat 
    } 

    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:3000/postdata', 
        body: JSON.stringify(data), 
        json: true 
    }; 
    
    var returndata; 
    var sendrequest = await request(options) 
    .then(function (parsedBody) { 
        console.log(parsedBody); 
        returndata = parsedBody;  
    }) 
    .catch(function (err) { 
        console.log(err); 
    }); 
    
    res.redirect("/transition");
  }
  else{
    res.redirect("/wait");
  } 
});

app.use('/flask1',async function (req, res) { 
    console.log(req.body.data);
    var data = { // this variable contains the data you want to send 
        data1: req.body.data, 
        data2: seat 
    } 

    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:3000/postdata', 
        body: JSON.stringify(data), 
        json: true 
    }; 
    
    var returndata; 
    var sendrequest = await request(options) 
    .then(function (parsedBody) { 
        console.log(parsedBody); 
        returndata = parsedBody;  
    }) 
    .catch(function (err) { 
        console.log(err); 
    }); 
    
    res.send("success");
  });

