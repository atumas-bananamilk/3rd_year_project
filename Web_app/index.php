<?php

require_once('login_check.php');

echo "<html>";
	echo "<head>";
		echo "<meta charset='utf-8'>";
		echo "<meta name='viewport' content='width=device-width'>";
		echo "<title>Home | POV 3D</title>";
	  	echo "<link rel='stylesheet' type='text/css' href='./style.css'>";
	  	echo "<script src='./main_scripts.js'></script>";
	echo "</head>";
	echo "<body>";

	echo "<div id='holder'>";
		echo "<form action='' method='post'>";
				echo "<input class='index_fields' id='loginUsername' name='loginUsername' placeholder='Username' type='text'>";
				echo "<input class='index_fields' id='loginPassword' name='loginPassword' placeholder='Password' type='password'>";
				echo "<span>"; echo "<br/>".$error; echo "</span>";
			echo "<input class='index_buttons' name='submitLogin' type='submit' value='LOGIN'></input>";
			echo "<div class='index_buttons' id='register_button' onclick='register()'>REGISTER</div>";
		echo "</form>";
	echo "</div>";

	echo "</body>";
echo "</html>";