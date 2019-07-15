var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 1044;
var nsp1 = io.of('/default-namespace');
var nsp2 = io.of('/secondary-namespace');
var nsp3 = io.of('/ternary-namespace');



app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  var socketName = 'default';
  socket.on('set name', function(name){
    socketName = name;
    socket.broadcast.emit('chat message bold', 'User ' + socketName +  ' has connected!');
  });
  socket.emit('chat message bold', 'Welcome');
});

nsp1.on('connection', function(socket){
  var socketName = 'default';
  socket.emit('chat message bold', 'Welcome');
  socket.on('set name', function(name){
    socketName = name;
    socket.broadcast.emit('chat message bold', 'User ' + socketName +  ' has connected!');
  });
  socket.on('leave', function(){
    socket.broadcast.emit('chat message bold', socketName + ' has left the chat');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', socketName + ': ' + msg);
  });
  socket.on('typingMessage', function(name){
    socket.broadcast.emit('typing', name);
  });

  socket.on('noLongerTypingMessage', function(name){
    socket.broadcast.emit('not typing', name);
  });
});

nsp2.on('connection', function(socket){
  var socketName = 'default';
  socket.emit('chat message bold', 'Welcome');
  socket.on('set name', function(name){
    socketName = name;
    socket.broadcast.emit('chat message bold', 'User ' + socketName +  ' has connected!');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', socketName + ': ' + msg);
  });
  socket.on('typingMessage', function(name){
    socket.broadcast.emit('typing', name);
  });
  socket.on('noLongerTypingMessage', function(name){
    socket.broadcast.emit('not typing', name);
  });
});

nsp3.on('connection', function(socket){
  var socketName = 'default';
  socket.emit('chat message bold', 'Welcome');
  socket.on('set name', function(name){
    socketName = name;
    socket.broadcast.emit('chat message bold', 'User ' + socketName +  ' has connected!');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', socketName + ': ' + msg);
  });
  socket.on('typingMessage', function(name){
    socket.broadcast.emit('typing', name);
  });

  socket.on('noLongerTypingMessage', function(name){
    socket.broadcast.emit('not typing', name);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
