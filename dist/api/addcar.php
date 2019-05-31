<?php
    include 'conn.php';

    $userphone = isset($_POST['userphone']) ? $_POST['userphone'] : '';
	if($userphone){
    $sql = "SELECT * FROM user WHERE phone = '$userphone'";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $uid = $content[0]['uid'];//找到用户id

    $sql2 = "SELECT * FROM goodscar WHERE uid = '$uid'";//根据用户id查找到购物车里商品

    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    $goods_nums = $res2->num_rows;//有多少种商品

    $arr = array();
    for ($i=0; $i < $goods_nums; $i++) {
      // echo "数字是：$i <br>";
       $arr[] = $content2[$i]['gid'];//拿到商品id添加到数组中
    } 
    

    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';//接收用户所添加的商品id
    $num = isset($_POST['num']) ? $_POST['num'] : '';//接收用户所添加的商品数量

	$upnum = isset($_POST['upnum']) ? $_POST['upnum'] : '';
    if(in_array($gid,$arr)){//购物车是否存在商品
    	if($upnum) {
    		$sql3 = "UPDATE goodscar SET num=$num WHERE gid = $gid AND uid = $uid";
    		$res3 = $conn->query($sql3);
    	}else{
//  		$sql7 = "SELECT num FROM goodscar WHERE gid = '$gid' AND uid = '$uid'";
//  		$res7 = $conn->query($sql7);
//  		$content7 = $res7->fetch_all(MYSQLI_ASSOC);
////  		echo $content7[0]['num'];
//  		if($content7[0]['num'] = 1) {
//  			$sql3 = "UPDATE goodscar SET num=1 WHERE gid = $gid AND uid = $uid";
//      		$res3 = $conn->query($sql3);
//  		}else{
    			$sql3 = "UPDATE goodscar SET num=num+$num-0 WHERE gid = $gid AND uid = $uid";
        		$res3 = $conn->query($sql3);
//  		}
    		
    	}
    }else{
        //不存在添加商品数据
        $sql3 = "INSERT INTO goodscar(gid,uid,num) VALUES($gid,$uid,$num)";
        $res3 = $conn->query($sql3);
    }
    // echo json_encode($content2,JSON_UNESCAPED_UNICODE);
    // echo $ok;
    // var_dump($arr);
    $sql4 = "SELECT SUM(num) FROM goodscar WHERE uid = $uid";
    $res4 = $conn->query($sql4);
    $content4 = $res4->fetch_all(MYSQLI_ASSOC);
    $one = isset($_POST['one']) ? $_POST['one'] : '';
    if($one) {
 		$sql5 = "SELECT num FROM goodscar WHERE uid = $uid AND gid = $gid";
 		$res5 = $conn->query($sql5);
   		$content5 = $res5->fetch_all(MYSQLI_ASSOC);
    	echo $content5[0]['num'];
    }else{
    	echo $content4[0]['SUM(num)']; //用户购物车商品总数量
    }
    //删除功能
    $delete = isset($_POST['delete']) ? $_POST['delete'] : '';
    if($delete){
    	$sql6 = "DELETE FROM goodscar WHERE gid = $gid and uid = $uid";
    	$res6 = $conn->query($sql6);
    }
    }
?>