var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var file_system = require('fs');
var five = require("johnny-five");
var board;
var led;

board = new five.Board();

board.on("ready", function() {
  led = new five.Led(13).strobe(1000);
});

app.listen(8080);

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });

  // if led message received
  socket.on('led', function (data) {
    console.log(data);
    
    if (board.isReady){
      led.strobe(data.delay);
    }
  });

});

// handle web server
function handler (req, res) {
  file_system.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}