<?php 

/**
* 
*/
class Site
{
	private static $handler;
	function __construct()
	{
		require_once 'class.database.php';
		self::$handler = Database::connect();
	}

	public function findOrFail($id){
		$sql = "SELECT * FROM sites WHERE id = ?";
		$query = self::$handler->prepare($sql);
		$query->execute(array($id));
		if ($query->rowCount() > 0) {
			return $query->fetch(PDO::FETCH_OBJ);
		}else {
			return null;
		}
	}

	public function delete($model){
		$sql = "DELETE FROM sites WHERE id = ?";
		$query = self::$handler->prepare($sql);
		$rs = $query->execute(array(
			$model->id
		));
		return $rs;
	}
}

