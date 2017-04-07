<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Index page for login/register. */

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
echo "<div id='top_name'>3D Persistence of Vision</div>";
echo "<div id='holder'>";
	echo "<form action='' method='post'>";
			echo "<input id='loginUsername' class='index_fields' name='loginUsername' placeholder='Username' type='text'>";
			echo "<input id='loginPassword' class='index_fields' name='loginPassword' placeholder='Password' type='password'>";
			echo "<span>"; echo "<br/>".$error; echo "</span>";
		echo "<input id='login_button' class='index_buttons' name='submitLogin' type='submit' value='LOGIN'></input>";
		echo "OR<br>";
		echo "<div id='register_button' class='index_buttons' id='register_button' onclick='register()'>REGISTER</div>";
	echo "</form>";
echo "</div>";
echo "</body>";
echo "</html>";