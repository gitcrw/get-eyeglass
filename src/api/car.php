<?php
	include 'conn.php';
	
	$userphone = isset($_POST['userphone']) ? $_POST['userphone'] : '';

    $sql = "SELECT * FROM user WHERE phone = '$userphone'";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $uid = $content[0]['uid'];//找到用户id

    $sql2 = "SELECT * FROM goodscar WHERE uid = '$uid'";//根据用户id查找到购物车里商品
    
    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
    
//  echo json_encode($content2,JSON_UNESCAPED_UNICODE);
    
    $goods_nums = $res2->num_rows;//有多少种商品

    $arr = array();
    for ($i=0; $i < $goods_nums; $i++) {
      // echo "数字是：$i <br>";
       $arr[] = $content2[$i]['gid'];//拿到商品id添加到数组中
    }
    $arr2 = array();
    //根据用户购物车里的商品id查找商品信息
    foreach ($arr as $value) {
	  $sql3 ="SELECT * FROM goods WHERE gid = $value";
	  $res3 = $conn->query($sql3);
	  $content3 = $res3->fetch_all(MYSQLI_ASSOC);
	  $arr2[] = $content3[0];
//	  echo json_encode($content3[0],JSON_UNESCAPED_UNICODE);
//	  var_dump($content3[0]); 
	}
	  echo json_encode($arr2,JSON_UNESCAPED_UNICODE);
//  $sql3 = "SELECT * FROM goods WHERE gid = 1"
//  var_dump($arr); 
?>