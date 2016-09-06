<?php 
	if (isset($_POST)) {
		include '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "INSERT INTO rpayrollemps SELECT * FROM payrollemps";
		$rs = $query = $handler->query($sql);
		if ($rs) {
			$sql = "TRUNCATE TABLE payrollemps";
			$query = $handler->query($sql);
			$sql = "INSERT INTO rpayrolls SELECT * FROM payrolls";
			$rs = $query = $handler->query($sql);
			if ($rs) {
				$sql = "TRUNCATE payrolls";
				$rs = $query = $handler->$query($sql);
				echo json_encode(array('success' => $rs));
			}
		}
	}	
?>