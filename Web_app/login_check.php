<?php
require_once('queries.php');

$error='';

if (isset($_POST['submitLogin'])){
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
		$password = mysqli_real_escape_string($conn, stripslashes(hash( 'ripemd160', $_POST['loginPassword'] )));

		$query = DBQuery::get_user_object($username, $password);
		$rows = mysqli_num_rows($query);

		// if database returns something
		if ($rows == 1){
			if ( !isset($_SESSION) ){ 
				session_start();
			}
			$_SESSION['login_user'] = $username;
     		echo "<script> window.location.assign('dashboard.php'); </script>";
		}
		else{
			$error = "Incorrect username or password.";
		}

		DBQuery::disconnect();
	}
}
?>
