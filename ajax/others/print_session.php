<?php
session_start(); 
	if (isset($_POST)) {
		# code...
		print_r($_SESSION);
	}
?>