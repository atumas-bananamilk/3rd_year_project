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
	  	echo "<script src='./scripts.js'></script>";
	echo "</head>";

echo "<html>";
	echo "<head>";
		echo "<meta charset='utf-8'>";
		echo "<meta name='viewport' content='width=device-width'>";
		echo "<title>Playground | POV 3D</title>";
	  	echo "<link rel='stylesheet' type='text/css' href='./style.css'>";
	  	echo "<link rel='stylesheet' type='text/css' href='./jQuery/jquery_UI.css'>";
	  	echo "<script src='./THREE/three.js'></script>";
	  	echo "<script src='./THREE/ConvexGeometry.js'></script>";
	  	echo "<script src='./THREE/OrbitControls.js'></script>";
	  	echo "<script src='./jQuery/jquery-1.12.4.js'></script>";
	  	echo "<script src='./jQuery/jquery_UI.js'></script>";
	  	echo "<script src='./scripts.js'></script>";
	  	echo "<script src='./main_scripts.js'></script>";
	echo "</head>";

	// we assume that we own this project
	// (assume there's no way for other users to change SESSION variables for this user)
	// $name = $_SESSION['name'];
	// $width_top = $_SESSION['width_top'];
	// $width_middle = $_SESSION['width_middle'];
	// $width_bottom = $_SESSION['width_bottom'];
	// $colour_R = $_SESSION['colour_R'];
	// $colour_G = $_SESSION['colour_G'];
	// $colour_B = $_SESSION['colour_B'];
	// $mov_direction = $_SESSION['mov_direction'];
	// $mov_speed = $_SESSION['mov_speed'];

	$name = $_GET['name'];

	DBQuery::connect();
	$project = DBQuery::get_project_by_username_and_project_name( $_SESSION['login_user'], $name );
	DBQuery::disconnect();

	// if user tries to access someone else's project
	if ( !isset($project) ){
		header("Location: ./dashboard.php");
	}

	$width_top = $project[0]['width_top'];
	$width_middle = $project[0]['width_middle'];
	$width_bottom = $project[0]['width_bottom'];
	$colour_R = $project[0]['colour_R'];
	$colour_G = $project[0]['colour_G'];
	$colour_B = $project[0]['colour_B'];
	$mov_direction = $project[0]['mov_direction'];
	$mov_speed = $project[0]['mov_speed'];

	echo "<body onload='load_JS(\"".$name."\", \"".$width_top."\", \"".$width_middle."\", \"".$width_bottom."\", \"".$colour_R."\", \"".$colour_G."\", \"".$colour_B."\", \"".$mov_direction."\", \"".$mov_speed."\")'>";

	// if logged in
	if (strlen($session_username) != 0){
		echo "Welcome!";
		echo "<a href='./logout.php'>LOGOUT</a>";

		echo "<br>";

		echo "<div id='drawing_block'>";
		echo "<img id='back_button' src='./images/back.png' onclick='go_back()'></img>";


      echo "<div id='canvas_block'></div>";
      echo "<div id='control_block'>";
	    echo "<div id='new_line'>";
		    echo "TOP";
		    echo "<input id='top_width_input' value='10'></input>";
		    echo "<div id='top_width'></div>";
		    echo "<br>";
		    echo "X";
		    echo "<div id='line_X'></div>";
		    echo "<br>";
		    echo "Y";
		    echo "<div id='line_Y'></div>";
		    echo "<br>";
		    echo "Z";
		    echo "<div id='line_Z'></div>";
		    echo "<br>";
		    echo "ROTATE X";
		    echo "<div id='line_rotate_X'></div>";
		    echo "<br>";
		    echo "ROTATE Y";
		    echo "<div id='line_rotate_Y'></div>";
		    echo "<br>";
		    echo "ROTATE Z";
		    echo "<div id='line_rotate_Z'></div>";

		    echo "<div class='control_buttons' onclick='show_result()'>SHOW RESULT</div>";
		    echo "<div class='control_buttons' onclick='clear_result()'>CLEAR RESULT</div>";
		    echo "<div class='control_buttons' onclick='generate_coordinates()'>GENERATE COORDINATES</div>";
		    echo "<div class='control_buttons' onclick='test_1()'>TEST 1</div>";
		    echo "<div class='control_buttons' onclick='test_2()'>TEST 2</div>";
		    // echo "<div class='control_buttons' onclick='send_coordinates()'>SEND</div>";

	    echo "</div>";

      echo "</div>";

      echo "</div>";

	}
	else{
		header('Location: ./index.php');
	}
	echo "</body>";
echo "</html>";