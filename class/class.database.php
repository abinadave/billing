<?php
	/**
	* 
	*/
	class Database
	{
		private static $dsn = 'mysql:host=localhost;dbname=ezjonesl_billing',
		$user = "ezjonesl_root",
		$pass = "qvE*TcZ9v+1Nzr*4=T",
		$pdo;

		function __construct()
		{
			# code...
		}

		public static function connect(){
			if (!isset(self::$pdo)) {
				try {
					$pdo = new PDO(self::$dsn, self::$user, self::$pass);
					$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				} catch (Exception $e) {
					die($e->getMessage());
				}
			}
			return $pdo;
		}
	}
 ?>	