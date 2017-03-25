<?php

if ( !isset($_SESSION) ){ 
	session_start();
}

require_once('queries.php');

// define session by username
$session_username = (isset($_SESSION['login_user']) ? $_SESSION['login_user'] : "");

// if logged in
if (strlen($session_username) != 0){
	$name = $_POST['name'];
	$img = $_POST['img'];

	DBQuery::connect();
	$query = DBQuery::get_project_image($_SESSION['login_user'], $name);

	// if database returns something
	if (sizeof($query) == 0){
		// if image doesn't exist - insert
		$query = DBQuery::save_project_image($_SESSION['login_user'], $name, $img);
		if ( sizeof($query) != 0 ){
			echo "Could not save project image.";
		}
	}
	else{
		// if image exists - update
		$query = DBQuery::update_project_image($_SESSION['login_user'], $name, $img);
		if ( sizeof($query) != 0 ){
			echo "Could not update project image.";
		}
	}

	DBQuery::disconnect();
}