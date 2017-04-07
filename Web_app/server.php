<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Checking if user register details are correct (showing errors). */

include "./libs/PHPSERIAL/PhpSerial.php";

// COM port address.
// NOTE: CHECK YOUR PORT MANUALLY AND CHANGE IT HERE.
$comPort = "/dev/cu.usbmodem97";

$data = $_POST['data'];

if (isset($data)){
	// write to a file for debugging
	write_to_file($data);
	// 2 second delay (or longer) is required
	send_serial_to_arduino(2, $data, $comPort);
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
	$myfile = fopen("./data_out.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $data);
	fclose($myfile);
}