<?php 
	if (isset($_POST['username']) && isset($_POST['password'])) {
		include_once '../../class/class.accounts.php';
		$accounts = new Accounts();
		$match = $accounts::vefiry_password($_POST['username'], $_POST['password']);
		// print_r($_POST);
		if (isset($_SESSION['id'])) {
			echo json_encode(array('match' => $match, 'session' => $_SESSION));
		}else {
			echo json_encode(array('match' => $match));
		}
		
	}
?>