<?php
include "./PhpSerial.php";

$comPort = "/dev/cu.usbmodem1411"; //The com port address. This is a debian address

$msg = $_POST['msg'];
$on = $_POST['on'];
$off = $_POST['off'];

if (isset($msg)){
	write_to_file($msg);
	send_serial_to_arduino(10, $msg, $comPort);
	send_serial_to_arduino(2, "a", $comPort);
	sleep(10);
	send_serial_to_arduino(2, "s", $comPort);
}
// if (isset($on)){
// 	write_to_file($on);
// 	send_serial_to_arduino(2, "a", $comPort);
// 	$on = null;
// }
// if (isset($off)){
// 	write_to_file($off);
// 	send_serial_to_arduino(2, "s", $comPort);
// 	$off = null;
// }

function send_serial_to_arduino($delay, $msg, $comPort){
	$serial = new PhpSerial;
	$serial->deviceSet($comPort);
	$serial->confBaudRate(9600);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(1);
	$serial->deviceOpen();

	sleep($delay);

	$serial->sendMessage($msg);
	$serial->deviceClose();
}

function write_to_file($msg){
	$myfile = fopen("./random.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $msg);
	fclose($myfile);
}