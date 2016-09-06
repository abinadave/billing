<?php
session_start(); 
	if (isset($_POST['id'])) {
		session_destroy();
		$_SESSION = [];
		foreach ($_POST as $key => $value) {
			$_SESSION[$key] = $value;
		}
	}
?>