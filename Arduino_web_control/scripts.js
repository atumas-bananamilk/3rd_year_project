var five = require("johnny-five");
var board = new five.Board();

var on = false;

function led_on(){
	board.on("ready", function() {
	  var led = new five.Led(13);
	  led.on();
	});
}

function led_off(){
	board.on("ready", function() {
	  var led = new five.Led(13);
	  led.off();
	});
}



function blink(){
	if (!on){
		led_on();
		on = true;
	}
	else{
		led_off();
		on = false;
	}
}