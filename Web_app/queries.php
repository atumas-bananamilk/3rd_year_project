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

	public static function get_project_by_username_and_project_name($username, $name){
		global $conn;

		$sql = "SELECT * FROM projects WHERE username = '".$username."' AND name = '".$name."'";
		$result = $conn->query($sql);

		$projects = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$temp = array(	'width_top' 	=> $row['width_top'],
								'width_middle' 	=> $row['width_middle'],
								'width_bottom' 	=> $row['width_bottom'],
								'colour_R' 		=> $row['colour_R'],
								'colour_G' 		=> $row['colour_G'],
								'colour_B' 		=> $row['colour_B'],
								'mov_direction' => $row['mov_direction'],
								'mov_speed' 	=> $row['mov_speed']);
				array_push($projects, $temp);
			}
			return $projects;
		}
	}

	public static function get_project_by_username($username){
		global $conn;

		$sql = "SELECT * FROM projects WHERE username = '".$username."'";
		$result = $conn->query($sql);

		$projects = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$temp = array(	'name'			=> $row['name'],
								'width_top' 	=> $row['width_top'],
								'width_middle' 	=> $row['width_middle'],
								'width_bottom' 	=> $row['width_bottom'],
								'colour_R' 		=> $row['colour_R'],
								'colour_G' 		=> $row['colour_G'],
								'colour_B' 		=> $row['colour_B'],
								'mov_direction' => $row['mov_direction'],
								'mov_speed' 	=> $row['mov_speed']);
				array_push($projects, $temp);
			}
			return $projects;
		}
	}


	public static function getInternships($role, $company, $sector, $durationOption)
	{
		global $conn;

		$sql = "SELECT * FROM jobs WHERE Role LIKE '%".$role."%' AND Company LIKE '%".$company."%' AND Sector LIKE '%".$sector."%' AND DurationOption LIKE '%".$durationOption."%' AND Category = 'Internship' ORDER BY JID LIMIT 3";

		$result = $conn->query($sql);

		$proposals = array();
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$temp = array(	'JID' => $row['JID'],
								'Company' => $row['Company'],
								'Role' => $row['Role'],
								'Sector' => $row['Sector'],
								'Category' => $row['Category'],
								'Duration' => $row['Duration'],
								'DurationOption' => $row['DurationOption'],
								'Deadline' => $row['Deadline']);
				array_push($proposals, $temp);
			}
			return $proposals;
		}
	}


}