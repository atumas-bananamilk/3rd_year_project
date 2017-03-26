<?php

require_once('register_check.php');

echo "<html>";
	echo "<head>";
		echo "<meta charset='utf-8'>";
		echo "<meta name='viewport' content='width=device-width'>";
		echo "<title>Register | POV 3D</title>";
	  	echo "<link rel='stylesheet' type='text/css' href='./style.css'>";
	  	echo "<script src='./main_scripts.js'></script>";
	echo "</head>";
	echo "<body>";

	echo "<div id='top_name'>Register</div>";
	echo "<div id='holder'>";
		echo "<form action='' method='post'>";
				echo "<input class='index_fields' id='loginUsername' name='loginUsername' placeholder='Username' type='text'>";
				echo "<input class='index_fields' id='loginPassword' name='loginPassword' placeholder='Password' type='password'>";
				echo "<span>"; echo "<br/>".$error; echo "</span>";
			echo "<input class='index_buttons' name='submit_register' type='submit' value='REGISTER'></input>";
		echo "</form>";
	echo "</div>";

	echo "</body>";
echo "</html>";