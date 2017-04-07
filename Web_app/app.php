<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* App page where users draw their own shapes and save them. */

if ( !isset($_SESSION) ){ 
	session_start();
}

require_once('queries.php');

$NO_OF_LAYERS = 9;
$DEFAULT_name = "undefined";
$DEFAULT_width = 10;
$DEFAULT_colour_R = 200;
$DEFAULT_colour_G = 0;
$DEFAULT_colour_B = 200;

$new = $_GET['new'];
$name = $_GET['name'];

if (isset($new) && $new == "true" && isset($name) && $name == "undefined"){
	$layers = array();
	for ($i = 1; $i <= 9; $i++){
		$layer = array('username' => $_SESSION['login_user'],
					   'name' => $DEFAULT_name,
					   'layer_number' => $i,
					   'width' => $DEFAULT_width,
					   'colour_R' => $DEFAULT_colour_R,
					   'colour_G' => $DEFAULT_colour_G,
					   'colour_B' => $DEFAULT_colour_B);
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
// if returned the wrong number of layers for this project
if (sizeof($layers) != $NO_OF_LAYERS){
	header("Location: ./dashboard.php");
}

// if logged in
if (isset($_SESSION['login_user'])){
	echo "<html>";
	echo "<head>";
		echo "<meta charset='utf-8'>";
		echo "<meta name='viewport' content='width=device-width'>";
		echo "<title>Playground | POV 3D</title>";
	  	echo "<link rel='stylesheet' type='text/css' href='./style.css'>";
	  	echo "<link rel='stylesheet' type='text/css' href='./libs/jQuery/jquery_UI.css'>";
	  	echo "<script src='./libs/THREE/three.js'></script>";
	  	echo "<script src='./libs/THREE/ConvexGeometry.js'></script>";
	  	echo "<script src='./libs/THREE/OrbitControls.js'></script>";
	  	echo "<script src='./libs/jQuery/jquery-1.12.4.js'></script>";
	  	echo "<script src='./libs/jQuery/jquery_UI.js'></script>";
	  	echo "<script src='./scripts.js'></script>";
	  	echo "<script src='./main_scripts.js'></script>";
	echo "</head>";

	require_once('header.php');

	echo "<body onload='load_JS(".json_encode($layers).")'>";

	echo "<div id='drawing_block'>";
	echo "<div id='back_button' onclick='go_back()'></div>";

	// if a new shape is being created
	if (isset($new) && $new == "true"){
		echo "<div id='save_button_new_project' src='./images/save.png' onclick='create_project()'>SAVE</div>";
	}
	// if a previously created shape is being changed
	else{
		echo "<div id='save_button' src='./images/save.png' onclick='update_project(\"".$name."\")'>SAVE</div>";
	}
	echo "<div id='layer_select'>";
		echo "<div id='layer_1' class='layer_options_selected' onclick='select_layer(1)'>1</div>";
		echo "<div id='layer_2' class='layer_options' onclick='select_layer(2)'>2</div>";
		echo "<div id='layer_3' class='layer_options' onclick='select_layer(3)'>3</div>";
		echo "<div id='layer_4' class='layer_options' onclick='select_layer(4)'>4</div>";
		echo "<div id='layer_5' class='layer_options' onclick='select_layer(5)'>5</div>";
		echo "<div id='layer_6' class='layer_options' onclick='select_layer(6)'>6</div>";
		echo "<div id='layer_7' class='layer_options' onclick='select_layer(7)'>7</div>";
		echo "<div id='layer_8' class='layer_options' onclick='select_layer(8)'>8</div>";
		echo "<div id='layer_9' class='layer_options' onclick='select_layer(9)'>9</div>";
	echo "</div>";
  	echo "<div id='canvas_block'></div>";
  	echo "<div id='control_block'>";

	    echo "Project name";
	    echo "<input id='name_input' value='".$name."'></input><br>";

	    echo "Layer width";
	    echo "<div id='width_slider'></div>";

	    echo "Red";
	    echo "<div id='colour_R_slider'></div>";

	    echo "Green";
	    echo "<div id='colour_G_slider'></div>";

	    echo "Blue";
	    echo "<div id='colour_B_slider'></div>";

	    echo "<div id='run_button' onclick='run()'>RUN</div>";
  	echo "</div>";
  	echo "</div>";
	echo "</body>";
	echo "</html>";
}
else{
	header('Location: ./index.php');
}