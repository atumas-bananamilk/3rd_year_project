<?php
include "./PhpSerial.php";

$comPort = "/dev/cu.usbmodem1411"; //The com port address. This is a debian address

$msg = $_POST['msg'];

if (isset($msg)){
	write_to_file($msg);
	send_serial_to_arduino($msg, $comPort);
}

function send_serial_to_arduino($msg, $comPort){
	$serial = new PhpSerial;
	$serial->deviceSet($comPort);
	$serial->confBaudRate(9600);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(1);
	$serial->deviceOpen();

	sleep(10);//2

	$serial->sendMessage($msg);
	$serial->deviceClose();
}

function write_to_file($msg){
	$myfile = fopen("./random.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $msg);
	fclose($myfile);
}