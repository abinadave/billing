<?php 
	if (isset($_POST['username']) && isset($_POST['password'])) {
		# code...
		include_once '../../class/class.engineers.php';
		$eng = new Engineers();
		echo json_encode($eng::verify($_POST));
	}
?>