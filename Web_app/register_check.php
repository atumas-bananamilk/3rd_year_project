<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Checking if user register details are correct (showing errors). */

require_once('queries.php');

$error='';

if (isset($_POST['submit_register'])){
	// If username or password is empty.
	if ( empty($_POST['loginUsername']) || empty($_POST['loginPassword']) ){
		$username_empty = false;
		$password_empty = false;

		if (empty($_POST['loginUsername'])){
			$username_empty = true;
		}
		if (empty($_POST['loginPassword'])){
			$password_empty = true;
		}

		if ($username_empty && $password_empty){
			$error = "Username and password are empty.";
		}
		else if ( empty($_POST['loginUsername']) ){
			$error = "Username is empty.";
		}
		else if ( empty($_POST['loginPassword']) ){
			$error = "Password is empty.";
		}
	}
	// if username or password is not empty
	else{
		DBQuery::connect();
		$username = mysqli_real_escape_string($conn, stripslashes( $_POST['loginUsername'] ));
		// hash the typed in password (avoid storing plain-text passwords)
		$password = mysqli_real_escape_string($conn, stripslashes(hash( 'ripemd160', $_POST['loginPassword'] )));

		$query = DBQuery::register_user($username, $password);

		// if database returns something
		if (strlen($query) == 0){
			if ( !isset($_SESSION) ){ 
				session_start();
			}
			$_SESSION['login_user'] = $username;
     		echo "<script> window.location.assign('dashboard.php'); </script>";
		}
		else{
			$error = $query;
		}

		DBQuery::disconnect();
	}
}