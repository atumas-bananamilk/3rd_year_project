<?php
/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Handler to logout (easier to scale project). */

if ( !isset($_SESSION) ){ 
	session_start();
}
if (session_destroy()){
	header("Location: ./index.php");
}