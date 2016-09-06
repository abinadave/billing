<?php
session_start();  
	if (isset($_POST)) {
		session_destroy();
		$_SESSION = [''];
		echo json_encode(array('success' => true));
	}	
?>