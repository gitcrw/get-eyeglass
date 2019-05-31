<?php 
	include 'conn.php';

	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';

	$password = isset($_POST['password']) ? $_POST['password'] : '';

	if($password) {
		$sql = "INSERT INTO user(phone,password) VALUES($phone,'$password')";
		$res = $conn->query($sql);
	}else{
		$sql = "SELECT * FROM user WHERE phone = '$phone'";
		$res = $conn->query($sql);
		if($res->num_rows) {
			echo 'no';
		}else{
			echo 'yes';
		}
	}

 ?>