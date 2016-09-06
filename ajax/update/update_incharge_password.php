<?php 
	if (isset($_POST['id']) && isset($_POST['password'])) {
		include_once '../../class/class.engineers.php';
		include_once '../../class/class.warehouse_incharges.php';
		$eng = new Engineers();
		$incharge = new Warehouse_incharges();
		$newPass = $eng::sanitize($_POST['password']);
		$rs = $incharge::updatePass($_POST['id'], $newPass);
		if ($rs) {
			echo json_encode(array('password' => $newPass));
		}
	}
?>

