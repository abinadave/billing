<?php
session_start(); 
	/**
	* 
	*/
	include_once 'class.database.php';	
	if (!function_exists('password_hash')) { include_once 'password_compat/lib/password.php'; }
	class Accounts extends Database
	{
		public static $handler;
		
		function __construct()
		{
			self::$handler = Database::connect();
		}

		public static function save($data){
			$id = self::generateRandomId();
			$password = self::sanitize($data['password']);
			$sql = "INSERT INTO accounts SET id = ?, firstname = ?, lastname = ?, username = ?, password = ?, usertype = ?, email = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id, $data['firstname'], $data['lastname'], $data['username'], $password, $data['usertype'], $data['email']));
			if ($query) {
				$values = array('password' => $password, 'id' => $id);
				return $values;
			}
		}

		public static function update($data){
			$password = self::sanitize($data['password']);
			$sql = "UPDATE accounts SET firstname = ?, lastname = ?, username = ?, password = ?, usertype = ?, email = ? WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($data['firstname'], $data['lastname'], $data['username'], $password, $data['usertype'], $data['email'], $data['hiddenid']));
			if ($query) {
				return $password;
			}else {
				return false;
			}
		}

		public static function remove($id){
			$sql = "DELETE FROM accounts WHERE id = ?";
			$query = self::$handler->prepare($sql);
			$query->execute(array($id));
			if ($query) {
				return true;
			}
		}

		public static function generateRandomId(){
			$done = 1;
			$rand = 0;
			while ($done) {
				$rand = rand(10000,99999);
				$sql = "SELECT * FROM accounts WHERE id = ?";
				$query = self::$handler->prepare($sql);
				$query->execute(array($rand));
				if ($query->rowCount() > 0) {
					# code...
					$done = 1;
				}else {
					$done = 0;
				}
			}

			return $rand;
		}

		public static function sanitize($password){
			$options = [
			    'cost' => 11,
			    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
			];
			return password_hash($password, PASSWORD_BCRYPT, $options);
	    }

	    public static function initialAccountVerification($data){
	    	$sql = "SELECT * FROM accounts WHERE username = ? AND password = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($data['username'], $data['password']));
	    	if ($query->rowCount()) {
	    		$row = $query->fetch(PDO::FETCH_OBJ);
	    		self::setSession($row);
	    		$row['success'] = true;
	    		return $row;
	    	}else {
	    		return array('id' => 0, 'success' => false);
	    	}
	    }

	    private static function setSession($row){
	    	foreach ($row as $key => $value) {
	    		$_SESSION[$key] = $value;
	    	}
	    }

	    public static function vefiry_password($username, $password){
	    	$sql = "SELECT * FROM accounts WHERE username = ?";
	    	$query = self::$handler->prepare($sql);
	    	$query->execute(array($username));
	    	$match = false;
	    	if ($query->rowCount() > 0) {
	    		while ($row = $query->fetch(PDO::FETCH_OBJ)) {
	    			if (password_verify($password, $row->password)) {
	    				$match = true;
	    				self::setSession($row);
	    			}
	    		}
	    	}
	    	return $match;
	    }

	  
	

	}
?>