<?php
    include 'conn.php';

    $userphone = isset($_POST['userphone']) ? $_POST['userphone'] : '15917211885';
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '1';

    $sql = "SELECT * FROM user WHERE phone = '$userphone'";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $uid = $content[0]['uid'];//找到用户id

    $sql2 = "SELECT num FROM goodscar WHERE uid = '$uid' and gid = $gid";//根据用户id查找到购物车里商品
    
    $res2 = $conn->query($sql2);

    if($res2->num_rows) {//如果有商品
        $content = $res2->fetch_all(MYSQLI_ASSOC);
        echo $content[0]['num'];//输出商品数量
    }else {
        echo 0;
    }

?>