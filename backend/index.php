<?php
require_once __DIR__ . '/inc/bootstrap.php';
// Allow CORS
// In this case, we allow all origins, so when you implement your project,
// you will not be blocked by CORS.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', '1');


//Check if 'action' is set in the GET parameters; if not, default to an empty string.
$action = $_GET['action'] ?? '';

//Create a new instance of the UserController class.
$controller = new UserController();

//Use a switch-case to decide which method of the controller to call 
//based on the 'action' parameter.
switch ($action) {
  case 'getCateNum':
    $controller->getCateNum();
    break;
  case 'login':
    $controller->login();
    break;
  case 'register':
    $controller->register();
    break;
  case 'getRatings':
    $controller->getRatings();
    break;
  case 'viewSong':
    $controller->viewSong();
    break;
  case 'updateSong':
    $controller->updateSong();
    break;
  case 'deleteSong':
    $controller->deleteSong();
    break;
  case 'createSong':
    $controller->createSong();
    break;
}
