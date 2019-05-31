<?php
	include 'conn.php';
	
	$userphone = isset($_POST['userphone']) ? $_POST['userphone'] : '';
	
	if($userphone){
	    $sql = "SELECT * FROM user WHERE phone = '$userphone'";
	
	    $res = $conn->query($sql);
	
	    $content = $res->fetch_all(MYSQLI_ASSOC);
	
	    $uid = $content[0]['uid'];//找到用户id
	
	    $sql2 = "SELECT SUM(num) FROM goodscar WHERE uid =1";//根据用户id查找到购物车里所有商品总量
	    
	    $sql3 = "SELECT num FROM goodscar WHERE uid =1";
	    
	    $res2 = $conn->query($sql2);
	    
		$res3 = $conn->query($sql3);
		
	    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
	    
	    if($res3->num_rows) {
	    	echo $content2[0]['SUM(num)'];;
	    }else {
	    	echo 0;
	    }
	    
  }
?>