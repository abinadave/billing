<?php

  require 'assets/Slim/Slim/Slim.php';
  require 'class/class.functions.php';
    
  \Slim\Slim::registerAutoloader();
  $app = new \Slim\Slim();

  $app->get('/', function(){
      require 'app.php';
  });

  $app->get('/eci_worker/site/:id', function($id){
      require 'class/class.eci_worker.php';
      $eci_worker = new Eci_worker();
      if ($id == 0) {
           $eci_worker->FetchAll($id);
       }else {
           $eci_worker->FetchWhereSite($id);
       }
  });

  $app->get('/eci_worker/designation/:id', function($id) use ($app){
       require 'class/class.eci_worker.php';
       $eci_worker = new Eci_worker();
       if ($id == 0) {
           $eci_worker->FetchAll($id);
       }else {
           $eci_worker->FetchWhereDesignation($id);
       }
       
  });

  $app->get('/recycled_eciworker', function(){
     $model = new Model();
     $data = $model::select('recycled_eciworkers');
     echo json_encode($data);
  });

  $app->post('/reason', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    $data['table'] = 'reasons';
    $model = new Model();
    echo json_encode($model::save($data));
  });

  $app->post('/recycled_eciworker', function() use ($app){
      $model = new Model();
      $data = json_decode($app->request()->getBody(), true);
      $id = $data['unique_id'];
      unset($data['unique_id']);
      $data['id'] = $id;
      $data['table'] = 'recycled_eciworkers';
      echo json_encode($model::save($data));
  });

  $app->delete('/designation/:id', function($id){
      $model = new Model();
      $rs = $model::delete(array(
         'table' => 'designations',
         'prop'  => 'id',
         'id'    => $id
      ));
      echo json_encode(array('success' => $rs));
  });

  $app->delete('/eci_worker/:id', function($id){
      $model = new Model();
      // require_once 'class/class.eci_worker.php';
      // $eci_worker = new Eci_worker();
      // $emp = $
      $empRs = $model::delete(array( 'table' => 'eci_workers', 'prop' => 'id', 'id' => $id ));
      echo json_encode(array('success' => $empRs));
  });

  $app->delete('/rpayroll/:id', function($id) use ($app){
    include_once 'class/class.rpayrolls.php';
    $rpayrolls = new Rpayrolls();
    $rpayrolls->restorePayroll($id);
  });

  $app->post('/recycled_employee', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    require 'class/class.database.php';
    $handler = Database::connect();
    $sql = "INSERT INTO recycled_employees SET id = ?, fullname = ?, designation = ?, truck_no = ?, date_hired = ?";
    $query = $handler->prepare($sql);
    $query->execute(array(
      $data['unique_id'],$data['fullname'],$data['designation'],$data['truck_no'],$data['date_hired']
    ));
  });

  $app->put('/eci_worker', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    require 'class/class.database.php';
    $handler = Database::connect();
    $sql = "UPDATE eci_workers SET fullname = ?, rpd = ?, designation = ?, site = ?, date_hired = ? WHERE id = ?";
    $query = $handler->prepare($sql);
    $rs = $query->execute(array( $data['fullname'], $data['rpd'], $data['designation'], $data['site'], $data['date_hired'], $data['id']));
    echo json_encode(array('updated' => $rs));
  });

  $app->post('/licensed_driver', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    $model = new Model();
    echo json_encode($model::save($data));
  });

  $app->post('/contract', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    $model = new Model();
    echo json_encode($model::save($data));
  });

  $app->post('/eci_worker', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    $model = new Model();
    echo json_encode($model::save($data));
  });

  $app->post('/designation', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    $model = new Model();
    $resp = $model::save($data);
    echo json_encode($resp);
  });

  $app->post('/site', function() use ($app){
    $data = json_decode($app->request()->getBody(), true);
    $model = new Model();
    $resp = $model::save($data);
    echo json_encode($resp);
  });


  // get eci workers
  $app->get('/eci_worker', function() use ($app){
    include_once 'class/class.database.payroll.php';
    $handler = Database::connect();
    $sql = "SELECT * FROM employees";
    $query = $handler->query($sql);
    $rows = $query->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($rows);
  });

  //refresh session
  $app->put("/721e6e6975d96e09d83f987c6c57f9ec", function() use ($app){
    $rs = ini_set('session.gc_maxlifetime', 28800);
    echo json_encode(array('resp' => $rs));
  });

  $app->get('/eci_worker', function() use ($app){
    echo json_encode(array('success' => true));
  });

  $app->post('/payrollemp', function() use ($app){
    $form = json_decode($app->request()->getBody(), true);
    $model = new Model();
    echo json_encode($model::save($form));
  });

  $app->post('/payroll', function() use ($app){
    $form = json_decode($app->request()->getBody(), true);
    $id = $form['unique_id'];
    unset($form['unique_id']);
    $model = new Model();
    $form['id'] = $id;
    $resp = $model::save($form);
    echo json_encode($resp);
  });

  $app->get('/check_admin', function() use ($app){
    if (isset($_SESSION['usertype'])) {
      $is = ($_SESSION['usertype'] === 'admin') ? true : false;
      echo json_encode(array('resp' => $is));
    }else {
      echo json_encode(array('resp' => false));
      // header( "Location: ." );
    }
  });

  $app->get('/payrollemp/partial', function() use ($app){
    include_once 'class/class.database.php';
    $handler = Database::connect();
    $sql = "SELECT * FROM payrollemps WHERE payroll_id IN (SELECT id FROM payrolls)";
    $query = $handler->query($sql);
    $rows = $query->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($rows);
  });

  $app->delete('/employee/:id', function ($id) use ($app){
    $model = new Model();
    $resp = $model::delete(array(
      'table' => 'employees',
      'prop'  => 'id',
      'id'    => $id
    ));
    echo json_encode(array('response' => $resp ));
  });

  $app->get('/employee', function() use ($app){
    $model = new Model();
    $rows = $model::fetchOrderBy(array(
      'table' => 'employees',
      'index' => 'id',
      'type'  => 'desc'
    ));
    echo json_encode($rows);
  });

  $app->post('/userlog', function() use ($app){
    $model = new Model();
    $requestBody = $app->request()->getBody();
    $json = json_decode($requestBody, true);
    $resp = $model::save($json);
    echo json_encode($resp);
  });

  $app->get('/payrollemp', function() use ($app){
    $model = new Model();
    echo json_encode($model::select('payrollemps'));
  });

  $app->get('/rpayroll', function() use ($app){
    $model = new Model();
    $rows = $model::fetchOrderBy(array(
      'table' => 'rpayrolls',
      'index' => 'id',
      'type'  => 'desc'
    ));
    echo json_encode($rows);
  });

  $app->get('/get/:tbl', function($tbl) use ($app){
    $model = new Model();
    echo json_encode($model::select($tbl));
  });

  $app->get('/get_order_by/:table/:index/:type', function($tbl, $index, $type) use ($app){
    $model = new Model();
    $resp = $model::fetchOrderBy(array(
      'table' => $tbl,
      'index' => $index,
      'type'  => $type
    ));
    echo json_encode($resp);
  });

  $app->run();
?>
