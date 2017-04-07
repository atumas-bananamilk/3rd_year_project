<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Handler to insert/update project image. */

if ( !isset($_SESSION) ){ 
	session_start();
}

require_once('queries.php');

// if logged in
if (isset($_SESSION['login_user'])){
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