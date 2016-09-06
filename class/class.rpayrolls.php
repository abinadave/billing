<?php  
	/**
	* 
	*/
	class Rpayrolls
	{
		private static $handler;
		function __construct()
		{
			include_once 'class.database.php';
			self::$handler = Database::connect();
		}

		public function restorePayroll($id){
			$sql = "INSERT INTO payrolls SELECT * FROM rpayrolls WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$ifPayrollRestored = $query->execute(array($id));
			if ($ifPayrollRestored) {
				$ifPayrollRemoved = $this->deleteRpayroll($id);
				if ($ifPayrollRemoved) {
					$ifPayrollempsRemoved = $this->restorePayrollemps($id);
					if ($ifPayrollempsRemoved) {
						$good = $this->deleteRpayrollemps($id);
						echo json_encode(array('response' => $good));
					}
				}
			}
		}

		public function restorePayrollemps($id){
			$sql = "INSERT INTO payrollemps SELECT * FROM rpayrollemps WHERE payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$rs = $query->execute(array($id));
			return $rs;
		}

		public function deleteRpayrollemps($id){
			$sql = "DELETE FROM rpayrollemps WHERE payroll_id = ?";
			$query = self::$handler->prepare($sql);
			$rs = $query->execute(array($id));
			return $rs;
		}

		public function deleteRpayroll($id){
			$sql = "DELETE FROM rpayrolls WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$rs = $query->execute(array($id));
			return $rs;
		}

	}
?>