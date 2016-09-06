<?php 
	if (isset($_POST)) {
		include_once '../../class/class.database.php';
		$handler = Database::connect();
		$sql = "SELECT * FROM engineer_items WHERE stock_id = ?";
		$query = $handler->prepare($sql);
		$query->execute(array($_POST['stock_id']));
		if ($query->rowCount() > 0) {
			$row = $query->fetch(PDO::FETCH_OBJ);
			$newBal = $row->running_bal + $_POST['qty'];
			$sql = "UPDATE engineer_items SET running_bal = ? WHERE stock_id = ?";
			$query = $handler->prepare($sql);
			$query->execute(array($newBal, $_POST['stock_id']));
			
		}
	}
?>