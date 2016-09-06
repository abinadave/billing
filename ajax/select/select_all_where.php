<?php 
		include_once '../../class/medoo.php';
		$database = new Medoo();
		$datas = $database->select($_GET['table'], "*", [$_GET['where'] => $_GET['value']]);
		echo json_encode($datas);    	
		
?>