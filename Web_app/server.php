<?php
include "./PhpSerial.php";

$comPort = "/dev/cu.usbmodem1411"; //The com port address. This is a debian address

$msg = $_POST['msg'];

$serial = new PhpSerial;
$serial->deviceSet($comPort);
$serial->confBaudRate(9600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->deviceOpen();

sleep(2);

$serial->sendMessage($msg);
$serial->deviceClose();

$myfile = fopen("./random.txt", "w") or die("Unable to open file!");
$txt = $msg;
fwrite($myfile, $txt);
fclose($myfile);