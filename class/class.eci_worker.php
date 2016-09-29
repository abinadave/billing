<?php 

class Eci_worker
{
	private static $handler;
	function __construct()
	{
		require 'class.database.php';
		self::$handler = Database::connect();
	}

	public function fetchByIndexType($index, $type){
		$sql = "SELECT * FROM eci_workers ORDER BY $index $type";
		$query = self::$handler->query($sql);
		return $query->fetchAll(PDO::FETCH_OBJ);
	}

	public function FetchWhereSite($site_id){
		$sql = "SELECT * FROM eci_workers WHERE site = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array(
			$site_id
		));
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	}

	public function FetchWhereDesignation($desig_id){
		$sql = "SELECT * FROM eci_workers WHERE designation = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array(
			$desig_id
		));
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	}

	public function FetchAll(){
		$sql = "SELECT * FROM eci_workers ORDER BY id DESC";
		$query = self::$handler->query($sql);
		$rows = $query->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($rows);
	}
}