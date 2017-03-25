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

	DBQuery::connect();

	$query = DBQuery::delete_project_image( $_SESSION['login_user'], $name );
	echo $query;

	DBQuery::disconnect();
}