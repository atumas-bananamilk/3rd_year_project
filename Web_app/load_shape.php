<?php

if ( !isset($_SESSION) ){ 
	session_start();
}
if ( isset($_SESSION['login_user']) ){
	$_SESSION['name'] = $_POST['name'];
	$_SESSION['width_top'] = $_POST['width_top'];
	$_SESSION['width_middle'] = $_POST['width_middle'];
	$_SESSION['width_bottom'] = $_POST['width_bottom'];
	$_SESSION['colour_R'] = $_POST['colour_R'];
	$_SESSION['colour_G'] = $_POST['colour_G'];
	$_SESSION['colour_B'] = $_POST['colour_B'];
	$_SESSION['mov_direction'] = $_POST['mov_direction'];
	$_SESSION['mov_speed'] = $_POST['mov_speed'];

	echo $_POST['name'];
}
else{
	header('Location: ./index.php');
}