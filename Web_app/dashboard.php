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
	  	echo "<script src='./libs/jQuery/jquery-1.12.4.js'></script>";
	  	echo "<script src='./libs/jQuery/jquery_UI.js'></script>";
	  	echo "<script src='./main_scripts.js'></script>";
	echo "</head>";
	echo "<body>";

	// if logged in
	if (strlen($session_username) != 0){
		require_once('header.php');

		echo "<div id='header'>";
			echo "<div id='title'>3D POV Semi-Hologram</div>";
			echo "<div id='logout_button' onclick='logout()'>LOGOUT</div>";
		echo "</div>";

		echo "<div id='projects_dashboard'>";

		echo "<div class='new_project_block' onclick='create_new_sketch()'>";
			echo "<img id='add_new_project_logo' src='./images/add_new_project.png'></img>";
		echo "</div>";

		DBQuery::connect();

		$all_layers = DBQuery::get_all_layers_by_username( $_SESSION['login_user'] );
		$projects = array();

		// if database returns something
		if (isset($all_layers)){
			for ($i = 0; $i < sizeof($all_layers); $i++){
				if ( !in_array( $all_layers[$i]['name'], $projects ) ){
					array_push($projects, $all_layers[$i]['name']);
				}
			}

			for ($i = 0; $i < sizeof($projects); $i++){
				echo "<div class='project_block'>";
					echo "<div class='project_top'>";
						echo "<div class='project_title'>".$projects[$i]."</div>";
						echo "<div class='project_delete_button_holder'>";
							echo "<img class='project_delete_button' src='./images/delete.png' onclick='ask_to_delete_project(\"".$projects[$i]."\")'></img>";
						echo "</div>";
					echo "</div>";
					$project_img = DBQuery::get_project_image( $_SESSION['login_user'], $projects[$i] );
					echo "<div class='project_bottom' onclick='open_sketch(\"".$projects[$i]."\")'>";
						echo "<img class='project_image' src='".$project_img[0]['image']."'></img>";
					echo "</div>";
				echo "</div>";
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