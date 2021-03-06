<?php 
/**
* 
*/
class Notification
{
	private static $handler;
	function __construct()
	{
		require 'class.database.php';
		self::$handler = Database::connect();
	}

	public function getNewestRow(){
		$sql = "SELECT * FROM notify_contract_days ORDER BY id DESC LIMIT 1";
		$query = self::$handler->query($sql);
		if ($query->rowCount() > 0) {
			return $query->fetch(PDO::FETCH_ASSOC);
		}else {
			return array('days' => 0, 'id' => 0);
		}
	}

	public function getNewestRowLicense(){
		$sql = "SELECT * FROM notify_license_days ORDER BY id DESC LIMIT 1";
		$query = self::$handler->query($sql);
		if ($query->rowCount() > 0) {
			return $query->fetch(PDO::FETCH_ASSOC);
		}else {
			return array('days' => 0, 'id' => 0);
		}
	}

	public function getLicenseNotificationDays(){
		$sql = "SELECT * FROM notify_license_days ORDER BY id DESC";
		$query = self::$handler->query($sql);
		return $query->fetchAll(PDO::FETCH_OBJ);
	}
}

