<?php 
	if (isset($_POST['username']) && isset($_POST['password'])) {
		# code...
		include_once '../../class/class.incharges.php';
		$incharges = new Incharges();
		echo json_encode($incharges::verify_account($_POST));
	}
?>