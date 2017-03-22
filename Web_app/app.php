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

	$new = $_GET['new'];
	$name = $_GET['name'];

	if (isset($new) && $new == "true" && isset($name) && $name == "undefined"){
		$layers = array();
		for ($i = 1; $i <= 9; $i++){
			$layer = array('username' => $_SESSION['login_user'],
						   'name' => 'undefined',
						   'layer_number' => $i,
						   'width' => 10,
						   'colour_R' => '200',
						   'colour_G' => '0',
						   'colour_B' => '200');
			array_push($layers, $layer);
		}
	}
	else{
		DBQuery::connect();
		$layers = DBQuery::get_layers_by_username_and_project_name( $_SESSION['login_user'], $name );
		DBQuery::disconnect();
	}

	// if user tries to access someone else's project's layers
	if ( !isset($layers) ){
		header("Location: ./dashboard.php");
	}
	// if returned a wrong number of layers for this project
	if (sizeof($layers) != 9){
		header("Location: ./dashboard.php");
	}

	echo "<body onload='load_JS(".json_encode($layers[0]).", "
								 .json_encode($layers[1]).", "
								 .json_encode($layers[2]).", "
								 .json_encode($layers[3]).", "
								 .json_encode($layers[4]).", "
								 .json_encode($layers[5]).", "
								 .json_encode($layers[6]).", "
								 .json_encode($layers[7]).", "
								 .json_encode($layers[8]).")'>";

	// if logged in
	if (strlen($session_username) != 0){
		echo "Welcome!";
		echo "<a href='./logout.php'>LOGOUT</a>";

		echo "<br>";

		echo "<div id='drawing_block'>";
		echo "<img id='back_button' src='./images/back.png' onclick='go_back()'></img>";

		if (isset($new) && $new == "true"){
			echo "<img id='save_button_new_project' src='./images/save.png' onclick='create_project()'></img>";
		}
		else{
			echo "<img id='save_button' src='./images/save.png' onclick='save_project()'></img>";
		}
		echo "<div id='layer_select'>";
			echo "<img id='layer_1' src='./images/number_1_selected.png' onclick='select_layer(1)'></img>";
			echo "<img id='layer_2' src='./images/number_2.png' onclick='select_layer(2)'></img>";
			echo "<img id='layer_3' src='./images/number_3.png' onclick='select_layer(3)'></img>";
			echo "<img id='layer_4' src='./images/number_4.png' onclick='select_layer(4)'></img>";
			echo "<img id='layer_5' src='./images/number_5.png' onclick='select_layer(5)'></img>";
			echo "<img id='layer_6' src='./images/number_6.png' onclick='select_layer(6)'></img>";
			echo "<img id='layer_7' src='./images/number_7.png' onclick='select_layer(7)'></img>";
			echo "<img id='layer_8' src='./images/number_8.png' onclick='select_layer(8)'></img>";
			echo "<img id='layer_9' src='./images/number_9.png' onclick='select_layer(9)'></img>";
		echo "</div>";

      echo "<div id='canvas_block'></div>";
      echo "<div id='control_block'>";
	    echo "<div id='new_line'>";

		    echo "WIDTH";
		    echo "<input id='width_input' value='".$layers[0]['width']."'></input>";
		    echo "<div id='width_slider'></div><br>";

		    echo "R";
		    echo "<input id='colour_R_input' value='".$layers[0]['colour_R']."'></input>";
		    echo "<div id='colour_R_slider'></div><br>";

		    echo "G";
		    echo "<input id='colour_G_input' value='".$layers[0]['colour_G']."'></input>";
		    echo "<div id='colour_G_slider'></div><br>";

		    echo "B";
		    echo "<input id='colour_B_input' value='".$layers[0]['colour_B']."'></input>";
		    echo "<div id='colour_B_slider'></div><br>";

		    echo "<div class='control_buttons' onclick='show_result()'>RANDOM</div>";
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