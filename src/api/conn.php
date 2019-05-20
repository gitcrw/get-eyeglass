<?php 
	$servername = 'localhost';
	$username = 'root';
	$userpwd = '';
	$dbname = '1904crw';

	$conn = new mysqli($servername,$username,$userpwd,$dbname);

	mysqli_query($conn,"set names utf8");
 ?>