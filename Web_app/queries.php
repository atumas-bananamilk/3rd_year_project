<?php
class DBQuery
{
	private static $servername = "localhost";
	private static $username = "root";
	private static $password = "";
	private static $dbname = "3rd_year_project";
	private static $conn;

	public static function connect(){	
		global $conn;
		$conn = new mysqli(self::$servername, self::$username, self::$password, self::$dbname);
		if ($conn->connect_error){
		     die("Connection failed: ".$conn->connect_error);
		}
	}
	public static function disconnect(){
		global $conn;
		$conn->close();
	}

	public static function get_user_object($username, $password){
		global $conn;
		$sql = "SELECT * FROM users WHERE username='".$username."' AND password='".$password."'";
		$result = $conn->query($sql);

		return $result;
	}

	public static function register_user($username, $password){
		global $conn;
		$sql = "INSERT INTO users (username, password) VALUES ('".$username."', '".$password."')";
		$result = $conn->query($sql);

		if ($result === TRUE) {
			return;
		}
		else {
		    return "Error: ".$conn->error;
		}
	}

	public static function get_project_info_by_username($username){
		global $conn;

		$sql = "SELECT * FROM projects WHERE username = '".$username."'";
		$result = $conn->query($sql);

		$projects = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$temp = array('name' => $row['name']);
				array_push($projects, $temp);
			}
			return $projects;
		}
	}

	public static function get_layers_by_username_and_project_name($username, $name){
		global $conn;

		$sql = "SELECT * FROM layers WHERE username = '".$username."' AND name = '".$name."'";
		$result = $conn->query($sql);

		$layers = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$temp = array(	'name'			=> $row['name'],
								'layer_number'	=> $row['layer_number'],
								'width' 		=> $row['width'],
								'colour_R' 		=> $row['colour_R'],
								'colour_G' 		=> $row['colour_G'],
								'colour_B' 		=> $row['colour_B']);
				array_push($layers, $temp);
			}
			return $layers;
		}
	}

	public static function get_all_layers_by_username($username){
		global $conn;

		$sql = "SELECT * FROM layers WHERE username = '".$username."'";
		$result = $conn->query($sql);

		$projects = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$temp = array('name' => $row['name']);
				array_push($projects, $temp);
			}
			return $projects;
		}
	}

	public static function create_layers_by_username_and_project_name_and_layer_number($all_layers){
		global $conn;
		$errors_occured = false;
		$error_messages = "";

		for ($i = 0; $i < sizeof($all_layers); $i++){
			$sql = "INSERT INTO layers (username, name, width, layer_number, colour_R, colour_G, colour_B) VALUES (".
					"'".$all_layers[$i]['username']."', ".
					"'".$all_layers[$i]['name']."', ".
					$all_layers[$i]['width'].", ".
					$all_layers[$i]['layer_number'].", ".
					$all_layers[$i]['colour_R'].", ".
					$all_layers[$i]['colour_G'].", ".
					$all_layers[$i]['colour_B'].
					")";
			$result = $conn->query($sql);

			if ($result === FALSE) {
			    $error_messages = "Error: ".$conn->error;
			    $errors_occured = true;
			}
		}

		if ( !$errors_occured ){
			return;
		}
		else{
			return $error_messages;
		}

	}

	public static function update_layers_by_username_and_project_name_and_layer_number($previous_name, $all_layers){
		global $conn;
		$errors_occured = false;
		$error_messages = "";

		for ($i = 0; $i < sizeof($all_layers); $i++){
			$sql = "UPDATE layers SET ".
					"name = '".$all_layers[$i]['name']."', ".
					"width = ".$all_layers[$i]['width'].", ".
					"colour_R = ".$all_layers[$i]['colour_R'].", ".
					"colour_G = ".$all_layers[$i]['colour_G'].", ".
					"colour_B = ".$all_layers[$i]['colour_B'].
					" WHERE username = '".$all_layers[$i]['username']."' AND name = '".$previous_name."' AND layer_number = ".$all_layers[$i]['layer_number'];
			$result = $conn->query($sql);

			if ($result === FALSE) {
			    $error_messages = "Error: ".$conn->error;
			    $errors_occured = true;
			}
		}

		if ( !$errors_occured ){
			return;
		}
		else{
			return $error_messages;
		}

	}


}