<?php

if ( !isset($_SESSION) ){ 
	session_start();
}

require_once('queries.php');

// define session by username
$session_username = (isset($_SESSION['login_user']) ? $_SESSION['login_user'] : "");

echo "<html>";
	echo "<head>";
		echo "<meta charset='utf-8'>";
		echo "<meta name='viewport' content='width=device-width'>";
		echo "<title>Dashboard | POV 3D</title>";
	  	echo "<link rel='stylesheet' type='text/css' href='./style.css'>";
	  	echo "<script src='./jQuery/jquery-1.12.4.js'></script>";
	  	echo "<script src='./jQuery/jquery_UI.js'></script>";
	  	echo "<script src='./main_scripts.js'></script>";
	echo "</head>";
	echo "<body>";

	// if logged in
	if (strlen($session_username) != 0){
		echo "Welcome!";
		echo "<a href='./logout.php'>LOGOUT</a>";

		echo "<br>";

		echo "<div id='projects_dashboard'>";

		echo "<div class='new_project_block' onclick='create_new_sketch()'>";
			echo "<img id='add_new_project_logo' src='./images/add_new_project.png'></img>";
		echo "</div>";

		DBQuery::connect();

		$projects = DBQuery::get_project_by_username( $_SESSION['login_user'] );

		// if database returns something
		if (isset($projects)){
			$no_of_projects = sizeof($projects);

			for ($i = 0; $i < $no_of_projects; $i++){
				// echo "<div class='project_block' onclick='open_ss(\"".$projects[$i]['name']."\",
				// 													  \"".$projects[$i]['width_top']."\",
				// 													  \"".$projects[$i]['width_middle']."\",
				// 													  \"".$projects[$i]['width_bottom']."\",
				// 													  \"".$projects[$i]['colour_R']."\",
				// 													  \"".$projects[$i]['colour_G']."\",
				// 													  \"".$projects[$i]['colour_B']."\",
				// 													  \"".$projects[$i]['mov_direction']."\",
				// 													  \"".$projects[$i]['mov_speed']."\")'>";

				echo "<div class='project_block' onclick='open_sketch(\"".$projects[$i]['name']."\")'>";
					echo $projects[$i]['name'];
				echo "</div>";

				if ( ($i + 2) % 5 == 0 ){
					echo "<br>";
				}
			}
		}

		DBQuery::disconnect();
			
		echo "</div>";
	}
	else{
		header('Location: ./index.php');
	}

	echo "</body>";
echo "</html>";