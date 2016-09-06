<?php
session_start(); 
	if (isset($_POST['payroll_id']) && isset($_SESSION['id'])) {
		include '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "INSERT INTO rpayrollemps SELECT * FROM payrollemps WHERE payroll_id = ?";
		$query = $handler->prepare($sql);
		$rs = $query->execute(array(
			$_POST['payroll_id']
		));
		if ($rs) {
			$sql = "DELETE FROM payrollemps WHERE payroll_id = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($_POST['payroll_id']));
		}
	}
?>