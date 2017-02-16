var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort('/dev/cu.usbmodem1411', { baudrate: 9600 });

var on = "nice";
var off = "asdasd";
 
serialPort.on("open", function () {
    console.log('open');
    
    setTimeout(function() {
        serialPort.write(on, function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
    }, 1600);

});