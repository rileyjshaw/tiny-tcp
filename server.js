var server = require('net').createServer(),
  sockets = [];

server.on('connection', function(socket) {
  console.log('New connected!');
  sockets.push(socket);

  socket.on('data', function(data) {
    console.log('Got data: ', data);

    sockets.forEach(function(otherSocket) {
      if ( otherSocket !== socket ) {
        otherSocket.write(data);
      }
    });
  });

  server.on('close', function() {
    console.log('Connection closed!');
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1);
  });

});

server.on('error', function(err) {
  console.log('Server error:', err.message);
});

server.on('close', function() {
  console.log('Server closed!')
});

server.listen(4000);
