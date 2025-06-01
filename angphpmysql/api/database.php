<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Contorl-Allow-Methods:PUT,GET,POST,DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, COntent-Type, Accept');
header('Content-Type:application/json;charset=UTF-8');

define('HOST','localhost');
define('USER','root');
define('PASS', '');
define('NAME','angdb');

$db = new mysqli(HOST,USER,PASS,NAME);
if($db->connect_error){
    die("Database connection error " . $db->connect_error);
}
?>