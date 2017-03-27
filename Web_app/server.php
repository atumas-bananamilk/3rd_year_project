<?php
include "./libs/PHPSERIAL/PhpSerial.php";

$comPort = "/dev/cu.usbmodem97"; //The com port address. This is a debian address

$data = $_POST['data'];

if (isset($data)){
	write_to_file($data);
	send_serial_to_arduino(2, $data, $comPort);
	// echo $data;
}

function send_serial_to_arduino($delay, $data, $comPort){
	$serial = new PhpSerial;
	$serial->deviceSet($comPort);
	$serial->confBaudRate(9600);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(1);
	$serial->deviceOpen();

	sleep($delay);

	$serial->sendMessage($data);
	$serial->deviceClose();
}

function write_to_file($data){
	$myfile = fopen("./random.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $data);
	fclose($myfile);
}