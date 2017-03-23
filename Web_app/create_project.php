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

	$all_layers_returned = DBQuery::get_all_layers_by_username( $_SESSION['login_user'] );
	$projects = array();

	// if database returns something
	if (isset($all_layers_returned)){
		for ($i = 0; $i < sizeof($all_layers_returned); $i++){
			if ( !in_array( $all_layers_returned[$i]['name'], $projects ) ){
				array_push($projects, $all_layers_returned[$i]['name']);
			}
		}
	}

	if ( in_array( $layers[0]['name'], $projects ) ){
		echo "Project with this name already exists.";
	}
	else{
		$query = DBQuery::create_layers_by_username_and_project_name_and_layer_number($all_layers);
		echo $query;
	}
	DBQuery::disconnect();
}