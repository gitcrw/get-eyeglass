<?php
	include 'conn.php';

    $userphone = isset($_POST['userphone']) ? $_POST['userphone'] : '15917211885';

    $sql = "SELECT * FROM user WHERE phone = '$userphone'";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $uid = $content[0]['uid'];//找到用户id

    $sql2 = "SELECT * FROM goodscar WHERE uid = '$uid'";//根据用户id查找到购物车里商品

    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
	
//	var_dump($content2[0]['num']);
//	echo count($content2);
	$arr = array();
	for($i=0; $i < count($content2); $i++) {
		$arr[] = $content2[$i]['num'];
	}
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    
?>