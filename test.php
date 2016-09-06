<?php 
	if (function_exists('password_hash')) {
		include_once 'class/class.accounts.php';
		$accounts = new Accounts();
		$pass = 'fetch eci workers';
		$hashed = $accounts::sanitize($pass);
		// echo $hashed;
		echo md5($pass);
	}
?>