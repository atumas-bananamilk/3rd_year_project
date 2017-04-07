<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Handler to delete a project. */

if ( !isset($_SESSION) ){ 
	session_start();
}

require_once('queries.php');

// if logged in
if (isset($_SESSION['login_user'])){
	$name = $_POST['name'];

	DBQuery::connect();
	$query = DBQuery::delete_project( $_SESSION['login_user'], $name );
	echo $query;
	DBQuery::disconnect();
}