<?php 
	include 'conn.php';

	$user = isset($_POST['user']) ? $_POST['user'] : '';

	$password = isset($_POST['password']) ? $_POST['password'] : '';

	$sql = "SELECT * FROM `user` WHERE phone = '$user' AND `password` = '$password'";
	
	$res = $conn->query($sql);

	if($res->num_rows) {
		echo 'yes';
	}else {
		echo 'no';
	}
 ?>