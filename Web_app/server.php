<?php
include "./PhpSerial.php";

$comPort = "/dev/cu.usbmodem1411"; //The com port address. This is a debian address
$msg = '';

$coordinates_given = $_POST['coordinates_given'];

// if(isset($_POST["hi"])){

	$serial = new PhpSerial;
	$serial->deviceSet($comPort);
	$serial->confBaudRate(9600);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(1);
	$serial->deviceOpen();

	sleep(2);

	$serial->sendMessage($coordinates_given);
	$serial->deviceClose();
	$msg = "You message has been sent! WOHOO!";
// }

?>

