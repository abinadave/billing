<?php session_start(); if (isset($_SESSION['id'])) { ?>
<!DOCTYPE html>
<html>
<head>
  <title>Garbarge Billing System</title>
     <link rel="stylesheet" type="text/css" href="assets/bootstrap/dist/css/bootstrap.min.css">
     <script data-main="js/main" src="js/require-jquery.js"></script>
     <script src="assets/bootstrap/dist/js/bootstrap.min.js"></script>
     <link rel="stylesheet" type="text/css" href="assets/font-awesome-4.6.1/css/font-awesome.min.css">
     <link rel="shortcut icon" href="assets/favico.png" />
</head>
<body>
  <div id="div-navigation"> 
      <nav class="navbar navbar-inverse static-top">
        <div class="container-fluid">
        
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <img class="img-rounded" style="width: 50px; height: 50px; padding: 4px" src="assets/ECI%20logo.jpg">
            <a class="navbar-brand" href="#">Ezjones Constructions</a>
          </div>

          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
            
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Employees <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#employees">Garbage Employees</a></li>
                  <li><a href="#eci-workers">ECI Employees</a></li>
                </ul>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Payroll <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#payrolls">Current Payroll</a></li>
                  <li><a href="#restore">Previous Payroll</a></li>
                </ul>
              </li>

              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Expiration <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#expiration/contract">Contract</a></li>
                  <li><a href="#expiration/license">License</a></li>
                </ul>
              </li>

             <?php if ($_SESSION['usertype'] === 'admin') { ?>
                <li><a href="#systemActivity">System Activity</a></li>
            <?php } ?>
              
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
      </div>

   <div id="main"></div>
   <div id="placeholder"></div>
<script src="js/script.js"></script>   
</body>
</html>
<?php }else { ?>
<!DOCTYPE html>
<html>
<head>
  <title>ECI Billing System</title>
   <script data-main="js/main" src="js/require-jquery.js"></script>
   <link rel="stylesheet" type="text/css" href="assets/bootstrap/dist/css/bootstrap.min.css">
   <script src="assets/bootstrap/dist/js/bootstrap.min.js"></script>
   <link rel="shortcut icon" href="assets/favico.png" />
</head>
<style type="text/css">
  body {
     
  }
</style>
<body style="background-image: url('assets/COMPACTOR%202.bmp')">
    <div id="main"></div>
</body>
</html>
<?php } ?>