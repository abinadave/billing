<?php 

	include_once 'medoo.php';
	class Model 
	{
		private $medoo;
		function __construct()
		{

		}

		public static function fetchOrderBy($get){
			include_once 'class.database.php';
			$handler = Database::connect();

			$index = $get['index'];
			$type = $get['type'];
			$table = $get['table'];

			$sql = "SELECT * FROM $table ORDER BY $index $type";
			$query = $handler->query($sql);
			return $query->fetchAll(PDO::FETCH_OBJ);
		}

		public static function save($json){
			$table = $json['table'];
			unset($json['table']);
			$database = new Medoo();
			$last_user_id = $database->insert($table, $json);
			if (empty($last_user_id)) {
				return $json;
			}else {
				$json['id'] = $last_user_id;
				return $json;
			}
		}

		public static function delete($json){
			$database = new Medoo();
			$result = $database->delete($json['table'], [
			    "AND" => [
			      $json['prop'] => $json['id']
			    ]
			]);
			return $result;
		}

		public static function select($table){
			$database = new Medoo();
			$datas = $database->select($table, "*");
			return $datas;
		}

		public static function get($json){
			$database = new Medoo();
			return $database->get($json['table'], "*", [
				$json['prop'] => $json['value']
			]);
		}

		public static function update($json){
			$table = $json['table'];
			$values = $json['values'];
			$where = $json['prop'];
			$where_value = $json['value'];
			unset($json['table']);
			$database = new Medoo(); 
			$database->update($table, $values, [
				$where => $where_value
			]);
		}

	}
?>