<?php 
	if (isset($_POST['id']) && isset($_POST['password'])) {
		include_once '../../class/class.engineers.php';
		$eng = new Engineers();
		$newPass = $eng::sanitize($_POST['password']);
		$rs = $eng::updatePass($_POST['id'], $newPass);
		if ($rs) {
			echo json_encode(array('password' => $newPass));
		}
	}
?>

