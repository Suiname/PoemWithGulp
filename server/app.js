var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    router = express.Router(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');

server.listen(8080, function(){
  console.log('The server is listening on port 8080')
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


require('./db/db')





// Socket Server Code

var onlineClients = {},
    usernames     = {}


io.sockets.on('connect', function(socket){

  socket.on('adduser', function(username){
    console.log(username.username)
    //  Here I'm saving the username of the current socket
    socket.username = username.username;
    // we store the username in socket session for this client
    // username = socketid string
    onlineClients[username.username] = socket.id;
    // add the client's username to the global list
    //username = string value username
    usernames[username.username] = username.username


    console.log(onlineClients)
    console.log(usernames)
    socket.broadcast.emit('updateUsers', Object.keys(usernames))
    socket.emit('updateUsers', Object.keys(usernames))
  })

  // private message socket Info
  //---------------------------------------------//
  socket.on('pm', function(userTo, privateMessage){
    console.log(userTo)
    console.log('--------------------')
    console.log(privateMessage)
  })




})// end of socket connection




