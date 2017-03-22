<?php

if ( !isset($_SESSION) ){ 
	session_start();
}

require_once('queries.php');

// define session by username
$session_username = (isset($_SESSION['login_user']) ? $_SESSION['login_user'] : "");

$layers = $_POST['layers'];

// if logged in
if (strlen($session_username) != 0){
	$all_layers = array();
	for ($i = 0; $i < sizeof($layers); $i++){
		$layer_info = array('username' => $_SESSION['login_user'],
							'name' => $layers[$i]['name'],
							'layer_number' => $layers[$i]['layer_number'],
							'width' => $layers[$i]['width'],
							'colour_R' => $layers[$i]['colour_R'],
							'colour_G' => $layers[$i]['colour_G'],
							'colour_B' => $layers[$i]['colour_B']);
		array_push($all_layers, $layer_info);
	}

	DBQuery::connect();
	$query = DBQuery::create_layers_by_username_and_project_name_and_layer_number($all_layers);
	echo $query;
	DBQuery::disconnect();
}