$(function () {
  var socket = io();
  $('form').hide();
  $('#namespaces').hide();

  $('#login').click(function(){
    socket = io();
    socket.emit('set name', $('#loginField').val());
    $('#namespaces').show();
    $('#loginDiv').hide();
    return false;
  });
  $('#default').click(function(){
    socket = io('/default-namespace');
    socket.emit('set name', $('#loginField').val());
    $('#messages').show();
    $('#namespaces').hide();
    $('form').show();
    return false;
  });
  $('#second').click(function(){
    socket = io('/secondary-namespace');
    socket.emit('set name', $('#loginField').val());
    $('#messages').show();
    $('#namespaces').hide();
    $('form').show();
    return false;
  });
  $('#third').click(function(){
    socket = io('/ternary-namespace');
    socket.emit('set name', $('#loginField').val());
    $('#namespaces').hide();
    $('#messages').show();
    $('form').show();
    return false;
  });

  $('#send').click(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });


  $('#leave').click(function(){
    socket.emit('leave');
    socket = io();
    $('#namespaces').show();
    $('#messages').hide();
    $('form').hide();
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  socket.on('chat message bold', function(msg){
    var li = document.createElement('li');
    li.style.fontWeight = 'bold';
    li.style.color = '#0000AA';
    $('#messages').append($(li).text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });

  var typing = false;
  var timeout = undefined;

  $('#m').keypress(function(){
    onKeyDownNotEnter();
  });
  function timeoutFunction(){
    typing = false;
    socket.emit('noLongerTypingMessage');
  }

  function onKeyDownNotEnter(){
    if(typing == false) {
      typing = true
      socket.emit('typingMessage');
      timeout = setTimeout(timeoutFunction, 3000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 3000);
    }

  }
  socket.on('typing', function(name){
    $('#typing').text(name + ' is typing...');
  });
  socket.on('not typing', function(name){
    $('#typing').text('');
  });
});