<?php

$comPort = "/dev/cu.usbmodem1411"; //The com port address. This is a debian address
$msg = '';

if(isset($_POST["hi"])){

	$serial = new phpSerial;
	$serial->deviceSet($comPort);
	$serial->confBaudRate(9600);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(1);
	$serial->deviceOpen();

	sleep(2);

	$serial->sendMessage("Well hello!");
	$serial->deviceClose();
	$msg = "You message has been sent! WOHOO!";
}

?>

<html>
	<head>
		<title>Arduino control</title>
	</head>
	<body>
		<form method="POST">
			<input type="submit" value="Send" name="hi">
		</form><br>

<?=$msg?>

	</body>
</html>